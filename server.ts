import express from "express";
import path from "path";
import fs from "fs";
import crypto from "crypto";
import { createServer as createViteServer } from "vite";
import dotenv from "dotenv";

dotenv.config();

const app = express();
const PORT = 3000;

app.use(express.json({ limit: "25mb" }));

// Path for JSON file database persistence
const DB_PATH = path.join(process.cwd(), "data", "db.json");

// Ensure data directory exists
if (!fs.existsSync(path.join(process.cwd(), "data"))) {
  fs.mkdirSync(path.join(process.cwd(), "data"), { recursive: true });
}

// Initial Database State
const defaultDb = {
  adminPassword: process.env.ADMIN_PASSWORD || "8BWA8BWA!",
  adminEmail: process.env.ADMIN_EMAIL || "turningpagestogetherofficial@gmail.com",
  sessions: [] as string[],
  posts: [] as any[],
  contacts: [] as any[],
  donationRequests: [] as any[],
  volunteers: [] as any[],
  pageViews: 0
};

// Helper function to read DB
function readDb() {
  try {
    if (!fs.existsSync(DB_PATH)) {
      fs.writeFileSync(DB_PATH, JSON.stringify(defaultDb, null, 2));
      return defaultDb;
    }
    const data = fs.readFileSync(DB_PATH, "utf-8");
    return JSON.parse(data);
  } catch (err) {
    console.error("Error reading database file, resetting to default", err);
    return defaultDb;
  }
}

// Helper function to write DB
function writeDb(dbData: any) {
  try {
    fs.writeFileSync(DB_PATH, JSON.stringify(dbData, null, 2));
  } catch (err) {
    console.error("Error writing to database file", err);
  }
}

// Admin Token Verification Middleware
function requireAdmin(req: express.Request, res: express.Response, next: express.NextFunction) {
  const authHeader = req.headers.authorization;
  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    return res.status(401).json({ error: "Unauthorized: Missing token" });
  }
  const token = authHeader.split(" ")[1];
  const db = readDb();
  if (!db.sessions.includes(token)) {
    return res.status(401).json({ error: "Unauthorized: Invalid token or session expired" });
  }
  next();
}

// ================= API ROUTES =================

// 1. Health check
app.get("/api/health", (req, res) => {
  res.json({ status: "ok", app: "Turning Pages Together" });
});

// 2. Auth: Admin Login
app.post("/api/auth/login", (req, res) => {
  const { email, password } = req.body;
  const db = readDb();
  const validEmail = db.adminEmail || process.env.ADMIN_EMAIL || "turningpagestogetherofficial@gmail.com";
  const validPassword = db.adminPassword || process.env.ADMIN_PASSWORD || "8BWA8BWA!";

  if (email === validEmail && password === validPassword) {
    const token = crypto.randomBytes(32).toString("hex");
    db.sessions.push(token);
    writeDb(db);
    return res.json({
      success: true,
      token,
      user: {
        email: validEmail,
        isAuthenticated: true
      }
    });
  }

  return res.status(401).json({ success: false, error: "Invalid administrator email or password." });
});

// Auth: Verify session token
app.get("/api/auth/me", (req, res) => {
  const authHeader = req.headers.authorization;
  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    return res.status(401).json({ isAuthenticated: false });
  }
  const token = authHeader.split(" ")[1];
  const db = readDb();
  if (db.sessions.includes(token)) {
    return res.json({
      isAuthenticated: true,
      email: db.adminEmail
    });
  }
  res.status(401).json({ isAuthenticated: false });
});

// Auth: Logout
app.post("/api/auth/logout", (req, res) => {
  const authHeader = req.headers.authorization;
  if (authHeader && authHeader.startsWith("Bearer ")) {
    const token = authHeader.split(" ")[1];
    const db = readDb();
    db.sessions = db.sessions.filter((s: string) => s !== token);
    writeDb(db);
  }
  res.json({ success: true });
});

// Auth: Change Admin Password
app.post("/api/auth/change-password", requireAdmin, (req, res) => {
  const { currentPassword, newPassword } = req.body;
  const db = readDb();
  if (currentPassword !== db.adminPassword) {
    return res.status(400).json({ error: "Current password does not match." });
  }
  if (!newPassword || newPassword.length < 6) {
    return res.status(400).json({ error: "New password must be at least 6 characters long." });
  }
  db.adminPassword = newPassword;
  writeDb(db);
  res.json({ success: true, message: "Password updated successfully." });
});

// 3. Blog Posts API

// Public: Get published blog posts (or all if admin)
app.get("/api/posts", (req, res) => {
  const db = readDb();
  // Increment view counter on list query
  db.pageViews = (db.pageViews || 0) + 1;
  writeDb(db);

  const authHeader = req.headers.authorization;
  const isAdmin = authHeader && authHeader.startsWith("Bearer ") && db.sessions.includes(authHeader.split(" ")[1]);

  let posts = db.posts || [];
  if (!isAdmin) {
    // Return only published posts or scheduled posts whose time has passed
    const now = new Date().toISOString();
    posts = posts.filter((p: any) => p.status === "published" || (p.status === "scheduled" && p.scheduledAt && p.scheduledAt <= now));
  }

  // Sort by publishedAt descending
  posts.sort((a: any, b: any) => new Date(b.publishedAt).getTime() - new Date(a.publishedAt).getTime());

  res.json(posts);
});

// Get single post
app.get("/api/posts/:idOrSlug", (req, res) => {
  const { idOrSlug } = req.params;
  const db = readDb();
  const post = db.posts.find((p: any) => p.id === idOrSlug || p.slug === idOrSlug);
  if (!post) {
    return res.status(404).json({ error: "Post not found" });
  }
  res.json(post);
});

// Admin: Create Post
app.post("/api/posts", requireAdmin, (req, res) => {
  const { title, summary, body, coverImage, author, category, status, scheduledAt, actionLinks } = req.body;
  if (!title || !body) {
    return res.status(400).json({ error: "Title and body are required." });
  }

  const db = readDb();
  const id = "post-" + Date.now();
  const slug = title.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, "");

  const newPost = {
    id,
    title,
    slug: slug || id,
    summary: summary || title,
    body,
    coverImage: coverImage || "https://images.unsplash.com/photo-1524995997946-a1c2e315a42f?auto=format&fit=crop&q=80&w=1200",
    author: author || "Turning Pages Together Team",
    publishedAt: new Date().toISOString(),
    category: category || "News",
    status: status || "published",
    scheduledAt: scheduledAt || null,
    actionLinks: Array.isArray(actionLinks) ? actionLinks : []
  };

  db.posts.unshift(newPost);
  writeDb(db);

  res.status(201).json(newPost);
});

// Admin: Edit Post
app.put("/api/posts/:id", requireAdmin, (req, res) => {
  const { id } = req.params;
  const { title, summary, body, coverImage, author, category, status, scheduledAt, actionLinks } = req.body;

  const db = readDb();
  const index = db.posts.findIndex((p: any) => p.id === id);
  if (index === -1) {
    return res.status(404).json({ error: "Post not found" });
  }

  const slug = title ? title.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, "") : db.posts[index].slug;

  db.posts[index] = {
    ...db.posts[index],
    title: title ?? db.posts[index].title,
    slug: slug || db.posts[index].slug,
    summary: summary ?? db.posts[index].summary,
    body: body ?? db.posts[index].body,
    coverImage: coverImage ?? db.posts[index].coverImage,
    author: author ?? db.posts[index].author,
    category: category ?? db.posts[index].category,
    status: status ?? db.posts[index].status,
    scheduledAt: scheduledAt ?? db.posts[index].scheduledAt,
    actionLinks: Array.isArray(actionLinks) ? actionLinks : db.posts[index].actionLinks
  };

  writeDb(db);
  res.json(db.posts[index]);
});

// Admin: Delete Post
app.delete("/api/posts/:id", requireAdmin, (req, res) => {
  const { id } = req.params;
  const db = readDb();
  const initialLength = db.posts.length;
  db.posts = db.posts.filter((p: any) => p.id !== id);

  if (db.posts.length === initialLength) {
    return res.status(404).json({ error: "Post not found" });
  }

  writeDb(db);
  res.json({ success: true, message: "Post deleted successfully" });
});

// 4. Admin Analytics & Submissions
app.get("/api/admin/stats", requireAdmin, (req, res) => {
  const db = readDb();
  res.json({
    totalPosts: db.posts ? db.posts.length : 0,
    contactSubmissionsCount: db.contacts ? db.contacts.length : 0,
    donationRequestsCount: db.donationRequests ? db.donationRequests.length : 0,
    volunteersCount: db.volunteers ? db.volunteers.length : 0,
    monthlyPageViews: db.pageViews || 0
  });
});

app.get("/api/admin/submissions", requireAdmin, (req, res) => {
  const db = readDb();
  res.json({
    contacts: db.contacts || [],
    donationRequests: db.donationRequests || [],
    volunteers: db.volunteers || []
  });
});

// 5. Public Form Submissions
app.post("/api/contact", (req, res) => {
  const { name, email, phone, message } = req.body;
  if (!name || !email || !message) {
    return res.status(400).json({ error: "Name, email, and message are required." });
  }
  const db = readDb();
  const submission = {
    id: "contact-" + Date.now(),
    name,
    email,
    phone: phone || "",
    message,
    createdAt: new Date().toISOString()
  };
  if (!db.contacts) db.contacts = [];
  db.contacts.unshift(submission);
  writeDb(db);

  res.status(201).json({ success: true, message: "Thank you for contacting Turning Pages Together! We will get back to you shortly." });
});

app.post("/api/donations/request", (req, res) => {
  const { name, email, phone, bookCount, condition, preferredOption, address, notes } = req.body;
  if (!name || !email || !phone) {
    return res.status(400).json({ error: "Name, email, and phone number are required." });
  }
  const db = readDb();
  const donation = {
    id: "donation-" + Date.now(),
    name,
    email,
    phone,
    bookCount: Number(bookCount) || 10,
    condition: condition || "gently_used",
    preferredOption: preferredOption || "drop_off",
    address: address || "",
    notes: notes || "",
    status: "pending",
    createdAt: new Date().toISOString()
  };
  if (!db.donationRequests) db.donationRequests = [];
  db.donationRequests.unshift(donation);
  writeDb(db);

  res.status(201).json({ success: true, message: "Your book donation request has been recorded. We will contact you with drop-off or pickup details!" });
});

app.post("/api/volunteers", (req, res) => {
  const { name, email, phone, role, availability, notes } = req.body;
  if (!name || !email || !phone) {
    return res.status(400).json({ error: "Name, email, and phone are required." });
  }
  const db = readDb();
  const volunteer = {
    id: "volunteer-" + Date.now(),
    name,
    email,
    phone,
    role: role || "general",
    availability: availability || "Weekends",
    notes: notes || "",
    createdAt: new Date().toISOString()
  };
  if (!db.volunteers) db.volunteers = [];
  db.volunteers.unshift(volunteer);
  writeDb(db);

  res.status(201).json({ success: true, message: "Thank you for signing up to volunteer with Turning Pages Together!" });
});


// ================= VITE / EXPRESS BOOTSTRAP =================
async function startServer() {
  if (process.env.NODE_ENV !== "production") {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa",
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), "dist");
    app.use(express.static(distPath));
    app.get("*", (req, res) => {
      res.sendFile(path.join(distPath, "index.html"));
    });
  }

  app.listen(PORT, "0.0.0.0", () => {
    console.log(`Turning Pages Together Server running on http://localhost:${PORT}`);
  });
}

startServer();
