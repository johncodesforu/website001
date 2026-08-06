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
  posts: [
    {
      id: "post-1",
      title: "Launch Announcement: Turning Pages Together Begins Inaugural Bay Area Literacy Campaign",
      slug: "launch-announcement-inaugural-literacy-campaign",
      summary: "We are excited to launch Turning Pages Together, bringing free children's books to Title I classrooms, neighborhood micro-libraries, and underserved communities.",
      body: `We are thrilled to officially announce the launch of **Turning Pages Together**! Our mission is simple yet powerful: ensure every child has access to inspiring, age-appropriate books regardless of family income or zip code.

### Addressing the Literacy Gap

For many children in under-resourced neighborhoods, access to age-appropriate reading material is severely limited. Research shows that children without access to home libraries face significant hurdles in early reading achievement.

Through our regional collection hubs, volunteer sorting teams, and school partnerships, every donated book will be inspected, sanitized, categorized by reading level, and placed directly into children's hands.

### Our Initial Focus Areas

1. **Title I Classroom Library Grants**: Supplying elementary teachers with curated 50-book reading corners.
2. **Community Micro-Libraries**: Installing weather-proof outdoor book boxes in neighborhood park plazas and community centers.
3. **Family Literacy Backpack Kits**: Packing personalized storybook bundles for pre-K and early readers.

### How You Can Get Involved Today

We invite parents, educators, students, and community members to join our launch effort! You can donate books at our Bay Area collection hubs, host a book drive at your school or workplace, or apply to volunteer with us.`,
      coverImage: "https://images.unsplash.com/photo-1524995997946-a1c2e315a42f?auto=format&fit=crop&q=80&w=1200",
      author: "Maya Lin, Founder & Executive Director",
      publishedAt: "2026-08-01T10:00:00Z",
      category: "News",
      status: "published",
      actionLinks: [
        {
          id: "al-1",
          label: "Host a Book Drive Bin (Google Form)",
          url: "https://forms.google.com",
          type: "google_form"
        },
        {
          id: "al-2",
          label: "Donate Gently Used Books",
          url: "/donate-books",
          type: "donation"
        }
      ]
    },
    {
      id: "post-2",
      title: "Introducing Our Community Micro-Library Initiative",
      slug: "introducing-community-micro-library-initiative",
      summary: "Expanding walk-up access to books through weather-proof neighborhood book boxes placed in park plazas and community centers.",
      body: `Literacy should never depend on zip code or income. That's why Turning Pages Together is rolling out our **Community Micro-Library Initiative**—installing wooden, weather-proof book boxes in accessible neighborhood spaces.

### Built by Volunteers, Sustained by Community

Operated on a simple *Take a book, share a book* model, our micro-libraries will provide 24/7 access to early readers, young adult fiction, and bilingual storybooks.

### Become a Micro-Library Steward

We are looking for dedicated neighborhood stewards and volunteer teams to help maintain and restock micro-library locations. Apply today to become a steward or help build collection boxes!`,
      coverImage: "https://images.unsplash.com/photo-1512820790803-83ca734da794?auto=format&fit=crop&q=80&w=1200",
      author: "David Chen, Community Partnerships",
      publishedAt: "2026-07-25T14:30:00Z",
      category: "Book Drives",
      status: "published",
      actionLinks: [
        {
          id: "al-3",
          label: "Apply to Steward a Micro-Library",
          url: "/get-involved",
          type: "volunteer"
        }
      ]
    },
    {
      id: "post-3",
      title: "Empowering Young Readers: Our STEM & Diversity Book Initiative",
      slug: "stem-and-diversity-book-initiative",
      summary: "Curating culturally responsive and STEM-focused literature so every child can see themselves as future scientists, authors, and leaders.",
      body: `Representation matters deeply in children's literature. When children see characters who look like them, share their cultural heritage, or tackle modern scientific mysteries, their engagement and confidence soar.

As part of our founding commitment, Turning Pages Together is curating **STEM & Diversity Book Kits** for young readers.

### Key Highlights of the Initiative:
- **Biographies of Diverse Trailblazers**: Inspiring true stories of mathematicians, engineers, and environmentalists.
- **Bilingual & Multilingual Editions**: Spanish, Mandarin, and Tagalog paired editions to support English Language Learners and families reading together at home.
- **Interactive Science Storybooks**: Engaging narratives that make learning fun and accessible.`,
      coverImage: "https://images.unsplash.com/photo-1497633762265-9d179a990aa6?auto=format&fit=crop&q=80&w=1200",
      author: "Turning Pages Together Team",
      publishedAt: "2026-07-10T09:15:00Z",
      category: "News",
      status: "published",
      actionLinks: [
        {
          id: "al-5",
          label: "Get Involved with Our Mission",
          url: "/get-involved",
          type: "volunteer"
        }
      ]
    }
  ],
  contacts: [] as any[],
  donationRequests: [] as any[],
  volunteers: [] as any[],
  pageViews: 120
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
