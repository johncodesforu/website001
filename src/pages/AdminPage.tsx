import React, { useState, useEffect } from "react";
import { Shield, Key, Mail, Lock, Plus, Edit2, Trash2, LogOut, CheckCircle, AlertCircle, BarChart3, FileText, Heart, Users, MessageSquare, Settings, Link as LinkIcon, PlusCircle, X, Sparkles, Eye } from "lucide-react";
import { BlogPost, ContactSubmission, DonationRequest, VolunteerSignup, AdminStats } from "../types";
import { loginAdmin, checkAdminAuth, logoutAdmin, createPost, updatePost, deletePost, fetchPosts, fetchAdminStats, fetchAdminSubmissions, changeAdminPassword } from "../lib/api";

interface AdminPageProps {
  isAdminLoggedIn: boolean;
  setIsAdminLoggedIn: (loggedIn: boolean) => void;
  onRefreshPosts: () => void;
  onSelectPost: (post: BlogPost) => void;
}

export const AdminPage: React.FC<AdminPageProps> = ({
  isAdminLoggedIn,
  setIsAdminLoggedIn,
  onRefreshPosts,
  onSelectPost,
}) => {
  // Login State
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loginError, setLoginError] = useState("");
  const [isLoggingIn, setIsLoggingIn] = useState(false);

  // Tab State
  const [activeTab, setActiveTab] = useState<"dashboard" | "create" | "manage" | "submissions" | "settings">("dashboard");

  // Admin Data State
  const [posts, setPosts] = useState<BlogPost[]>([]);
  const [stats, setStats] = useState<AdminStats | null>(null);
  const [submissions, setSubmissions] = useState<{
    contacts: ContactSubmission[];
    donationRequests: DonationRequest[];
    volunteers: VolunteerSignup[];
  }>({ contacts: [], donationRequests: [], volunteers: [] });

  // Post Editor Form State
  const [editingPostId, setEditingPostId] = useState<string | null>(null);
  const [postForm, setPostForm] = useState({
    title: "",
    summary: "",
    body: "",
    coverImage: "https://images.unsplash.com/photo-1524995997946-a1c2e315a42f?auto=format&fit=crop&q=80&w=1200",
    author: "Turning Pages Together Admin",
    category: "News" as "News" | "Success Stories" | "Events" | "Book Drives",
    status: "published" as "published" | "scheduled" | "draft",
    scheduledAt: "",
    actionLinks: [] as { id: string; label: string; url: string; type: any }[]
  });

  // Action Link Temp Builder State
  const [newLinkLabel, setNewLinkLabel] = useState("");
  const [newLinkUrl, setNewLinkUrl] = useState("https://forms.google.com");
  const [newLinkType, setNewLinkType] = useState<any>("google_form");

  // Password Manager State
  const [passForm, setPassForm] = useState({ currentPassword: "", newPassword: "", confirmPassword: "" });
  const [passStatus, setPassStatus] = useState<{ type: "success" | "error" | null; message: string }>({ type: null, message: "" });

  // Check auth on mount
  useEffect(() => {
    checkAdminAuth().then((auth) => {
      setIsAdminLoggedIn(auth);
      if (auth) {
        loadAdminData();
      }
    });
  }, []);

  const loadAdminData = async () => {
    try {
      const fetchedPosts = await fetchPosts();
      setPosts(fetchedPosts);

      const fetchedStats = await fetchAdminStats();
      setStats(fetchedStats);

      const fetchedSubmissions = await fetchAdminSubmissions();
      setSubmissions(fetchedSubmissions);
    } catch (err) {
      console.error("Error loading admin data", err);
    }
  };

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoggingIn(true);
    setLoginError("");

    try {
      await loginAdmin(email, password);
      setIsAdminLoggedIn(true);
      await loadAdminData();
      onRefreshPosts();
    } catch (err: any) {
      setLoginError(err.message || "Invalid administrator credentials.");
    } finally {
      setIsLoggingIn(false);
    }
  };

  const handleLogout = async () => {
    await logoutAdmin();
    setIsAdminLoggedIn(false);
  };

  const handleAddActionLink = () => {
    if (!newLinkLabel || !newLinkUrl) return;
    const newLink = {
      id: "al-" + Date.now(),
      label: newLinkLabel,
      url: newLinkUrl,
      type: newLinkType
    };
    setPostForm((prev) => ({
      ...prev,
      actionLinks: [...prev.actionLinks, newLink]
    }));
    setNewLinkLabel("");
  };

  const handleRemoveActionLink = (id: string) => {
    setPostForm((prev) => ({
      ...prev,
      actionLinks: prev.actionLinks.filter((l) => l.id !== id)
    }));
  };

  const handleSavePost = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      if (editingPostId) {
        await updatePost(editingPostId, postForm);
      } else {
        await createPost(postForm);
      }
      resetPostForm();
      await loadAdminData();
      onRefreshPosts();
      setActiveTab("manage");
    } catch (err: any) {
      alert("Error saving post: " + err.message);
    }
  };

  const handleEditClick = (post: BlogPost) => {
    setEditingPostId(post.id);
    setPostForm({
      title: post.title,
      summary: post.summary,
      body: post.body,
      coverImage: post.coverImage,
      author: post.author,
      category: post.category,
      status: post.status,
      scheduledAt: post.scheduledAt || "",
      actionLinks: post.actionLinks || []
    });
    setActiveTab("create");
  };

  const handleDeleteClick = async (id: string) => {
    if (!window.confirm("Are you sure you want to delete this post? This action cannot be undone.")) return;
    try {
      await deletePost(id);
      await loadAdminData();
      onRefreshPosts();
    } catch (err: any) {
      alert("Error deleting post: " + err.message);
    }
  };

  const resetPostForm = () => {
    setEditingPostId(null);
    setPostForm({
      title: "",
      summary: "",
      body: "",
      coverImage: "https://images.unsplash.com/photo-1524995997946-a1c2e315a42f?auto=format&fit=crop&q=80&w=1200",
      author: "Turning Pages Together Admin",
      category: "News",
      status: "published",
      scheduledAt: "",
      actionLinks: []
    });
  };

  const handleChangePass = async (e: React.FormEvent) => {
    e.preventDefault();
    setPassStatus({ type: null, message: "" });
    if (passForm.newPassword !== passForm.confirmPassword) {
      setPassStatus({ type: "error", message: "New passwords do not match." });
      return;
    }
    try {
      await changeAdminPassword(passForm.currentPassword, passForm.newPassword);
      setPassStatus({ type: "success", message: "Administrator password updated successfully!" });
      setPassForm({ currentPassword: "", newPassword: "", confirmPassword: "" });
    } catch (err: any) {
      setPassStatus({ type: "error", message: err.message || "Failed to update password." });
    }
  };

  // ================= LOGIN FORM VIEW =================
  if (!isAdminLoggedIn) {
    return (
      <div id="admin-login-view" className="max-w-md mx-auto my-12 px-4">
        <div className="bg-white dark:bg-slate-800 p-8 rounded-3xl border border-slate-200 dark:border-slate-700 shadow-2xl space-y-6">
          <div className="text-center space-y-2">
            <div className="w-12 h-12 rounded-2xl bg-slate-900 text-white mx-auto flex items-center justify-center shadow-lg">
              <Shield className="w-6 h-6 text-emerald-400" />
            </div>
            <h2 className="text-2xl font-bold text-slate-900 dark:text-white">Admin Portal</h2>
            <p className="text-xs text-slate-500">
              Turning Pages Together Content Publishing Dashboard
            </p>
          </div>

          {loginError && (
            <div className="p-3 rounded-xl bg-red-50 text-red-700 border border-red-200 text-xs font-medium">
              {loginError}
            </div>
          )}

          <form onSubmit={handleLogin} className="space-y-4">
            <div>
              <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
                Admin Email
              </label>
              <div className="relative">
                <Mail className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
                <input
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="admin@turningpagestogether.org"
                  className="w-full bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-xl pl-9 pr-3.5 py-2.5 text-xs text-slate-900 dark:text-white focus:outline-none focus:border-blue-500"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
                Password
              </label>
              <div className="relative">
                <Lock className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
                <input
                  type="password"
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••"
                  className="w-full bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-xl pl-9 pr-3.5 py-2.5 text-xs text-slate-900 dark:text-white focus:outline-none focus:border-blue-500"
                />
              </div>
            </div>

            <button
              type="submit"
              disabled={isLoggingIn}
              className="w-full bg-slate-900 dark:bg-white text-white dark:text-slate-900 font-bold py-3 rounded-xl text-xs hover:opacity-90 transition-opacity shadow-md flex items-center justify-center gap-2"
            >
              <Key className="w-4 h-4" />
              <span>{isLoggingIn ? "Authenticating..." : "Login to Admin Dashboard"}</span>
            </button>
          </form>
        </div>
      </div>
    );
  }

  // ================= ADMIN DASHBOARD VIEW =================
  return (
    <div id="admin-dashboard-container" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8 pb-20">
      
      {/* ADMIN HEADER BAR */}
      <div className="bg-slate-900 text-white p-6 rounded-3xl border border-slate-800 shadow-xl flex flex-col sm:flex-row items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-2xl bg-emerald-500 text-slate-950 flex items-center justify-center font-bold">
            <Shield className="w-5 h-5" />
          </div>
          <div>
            <h2 className="font-bold text-lg text-white">Administrator Control Panel</h2>
            <div className="text-xs text-slate-400">
              Authenticated as: <span className="text-emerald-400 font-medium">turningpagestogetherofficial@gmail.com</span>
            </div>
          </div>
        </div>

        <button
          onClick={handleLogout}
          className="bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-semibold px-4 py-2 rounded-xl border border-slate-700 flex items-center gap-1.5 transition-colors"
        >
          <LogOut className="w-3.5 h-3.5" />
          <span>Sign Out</span>
        </button>
      </div>

      {/* DASHBOARD TABS */}
      <div className="flex flex-wrap items-center gap-2 border-b border-slate-200 dark:border-slate-800 pb-2">
        <button
          onClick={() => setActiveTab("dashboard")}
          className={`px-4 py-2 rounded-xl text-xs font-bold transition-all flex items-center gap-2 ${
            activeTab === "dashboard"
              ? "bg-blue-600 text-white shadow-sm"
              : "text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800"
          }`}
        >
          <BarChart3 className="w-4 h-4" />
          <span>Overview</span>
        </button>

        <button
          onClick={() => {
            resetPostForm();
            setActiveTab("create");
          }}
          className={`px-4 py-2 rounded-xl text-xs font-bold transition-all flex items-center gap-2 ${
            activeTab === "create"
              ? "bg-blue-600 text-white shadow-sm"
              : "text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800"
          }`}
        >
          <PlusCircle className="w-4 h-4" />
          <span>{editingPostId ? "Edit Post" : "Create New Post"}</span>
        </button>

        <button
          onClick={() => setActiveTab("manage")}
          className={`px-4 py-2 rounded-xl text-xs font-bold transition-all flex items-center gap-2 ${
            activeTab === "manage"
              ? "bg-blue-600 text-white shadow-sm"
              : "text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800"
          }`}
        >
          <FileText className="w-4 h-4" />
          <span>Manage Blog ({posts.length})</span>
        </button>

        <button
          onClick={() => setActiveTab("submissions")}
          className={`px-4 py-2 rounded-xl text-xs font-bold transition-all flex items-center gap-2 ${
            activeTab === "submissions"
              ? "bg-blue-600 text-white shadow-sm"
              : "text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800"
          }`}
        >
          <MessageSquare className="w-4 h-4" />
          <span>Form Submissions</span>
        </button>

        <button
          onClick={() => setActiveTab("settings")}
          className={`px-4 py-2 rounded-xl text-xs font-bold transition-all flex items-center gap-2 ${
            activeTab === "settings"
              ? "bg-blue-600 text-white shadow-sm"
              : "text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800"
          }`}
        >
          <Settings className="w-4 h-4" />
          <span>Settings</span>
        </button>
      </div>

      {/* TAB 1: DASHBOARD OVERVIEW */}
      {activeTab === "dashboard" && stats && (
        <div className="space-y-6">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
            <div className="bg-white dark:bg-slate-800 p-5 rounded-2xl border border-slate-200 dark:border-slate-700 shadow-sm space-y-1">
              <div className="text-xs text-slate-500 font-medium">Published Posts</div>
              <div className="text-3xl font-extrabold text-blue-600 dark:text-blue-400">{stats.totalPosts}</div>
            </div>

            <div className="bg-white dark:bg-slate-800 p-5 rounded-2xl border border-slate-200 dark:border-slate-700 shadow-sm space-y-1">
              <div className="text-xs text-slate-500 font-medium">Monthly Views</div>
              <div className="text-3xl font-extrabold text-emerald-600 dark:text-emerald-400">{stats.monthlyPageViews.toLocaleString()}</div>
            </div>

            <div className="bg-white dark:bg-slate-800 p-5 rounded-2xl border border-slate-200 dark:border-slate-700 shadow-sm space-y-1">
              <div className="text-xs text-slate-500 font-medium">Contact Messages</div>
              <div className="text-3xl font-extrabold text-purple-600 dark:text-purple-400">{stats.contactSubmissionsCount}</div>
            </div>

            <div className="bg-white dark:bg-slate-800 p-5 rounded-2xl border border-slate-200 dark:border-slate-700 shadow-sm space-y-1">
              <div className="text-xs text-slate-500 font-medium">Donation Requests</div>
              <div className="text-3xl font-extrabold text-amber-600 dark:text-amber-400">{stats.donationRequestsCount}</div>
            </div>
          </div>

          <div className="bg-white dark:bg-slate-800 p-6 rounded-3xl border border-slate-200 dark:border-slate-700 shadow-sm space-y-4">
            <h3 className="font-bold text-slate-900 dark:text-white text-base">Quick Publishing Actions</h3>
            <div className="flex flex-wrap gap-3">
              <button
                onClick={() => {
                  resetPostForm();
                  setActiveTab("create");
                }}
                className="bg-blue-600 text-white font-bold px-4 py-2.5 rounded-xl text-xs flex items-center gap-2"
              >
                <Plus className="w-4 h-4" />
                <span>Write New Article</span>
              </button>
              <button
                onClick={() => setActiveTab("manage")}
                className="bg-slate-100 dark:bg-slate-700 text-slate-800 dark:text-slate-200 font-bold px-4 py-2.5 rounded-xl text-xs flex items-center gap-2"
              >
                <FileText className="w-4 h-4" />
                <span>Review Existing Posts</span>
              </button>
            </div>
          </div>
        </div>
      )}

      {/* TAB 2: CREATE / EDIT POST */}
      {activeTab === "create" && (
        <div className="bg-white dark:bg-slate-800 p-8 rounded-3xl border border-slate-200 dark:border-slate-700 shadow-xl space-y-6">
          <div className="flex items-center justify-between">
            <h3 className="font-bold text-slate-900 dark:text-white text-xl">
              {editingPostId ? "Edit Blog Post" : "Publish New Blog Post"}
            </h3>
            {editingPostId && (
              <button
                onClick={resetPostForm}
                className="text-xs font-semibold text-slate-500 hover:underline"
              >
                Cancel Edit Mode
              </button>
            )}
          </div>

          <form onSubmit={handleSavePost} className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
                  Article Title *
                </label>
                <input
                  type="text"
                  required
                  value={postForm.title}
                  onChange={(e) => setPostForm({ ...postForm, title: e.target.value })}
                  placeholder="e.g. Fall Book Drive Exceeds Goal"
                  className="w-full bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-xl px-3.5 py-2.5 text-xs text-slate-900 dark:text-white focus:outline-none focus:border-blue-500"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
                  Category
                </label>
                <select
                  value={postForm.category}
                  onChange={(e) => setPostForm({ ...postForm, category: e.target.value as any })}
                  className="w-full bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-xl px-3.5 py-2.5 text-xs text-slate-900 dark:text-white focus:outline-none focus:border-blue-500"
                >
                  <option value="News">News</option>
                  <option value="Book Drives">Book Drives</option>
                  <option value="Success Stories">Success Stories</option>
                  <option value="Events">Events</option>
                </select>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
                  Cover Image URL
                </label>
                <input
                  type="text"
                  value={postForm.coverImage}
                  onChange={(e) => setPostForm({ ...postForm, coverImage: e.target.value })}
                  placeholder="https://images.unsplash.com/..."
                  className="w-full bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-xl px-3.5 py-2.5 text-xs text-slate-900 dark:text-white focus:outline-none focus:border-blue-500"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
                  Author Name
                </label>
                <input
                  type="text"
                  value={postForm.author}
                  onChange={(e) => setPostForm({ ...postForm, author: e.target.value })}
                  className="w-full bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-xl px-3.5 py-2.5 text-xs text-slate-900 dark:text-white focus:outline-none focus:border-blue-500"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
                Short Article Summary *
              </label>
              <input
                type="text"
                required
                value={postForm.summary}
                onChange={(e) => setPostForm({ ...postForm, summary: e.target.value })}
                placeholder="A 1-2 sentence overview shown on post cards..."
                className="w-full bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-xl px-3.5 py-2.5 text-xs text-slate-900 dark:text-white focus:outline-none focus:border-blue-500"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
                Full Article Body (Supports Markdown & Paragraph Breaks) *
              </label>
              <textarea
                rows={8}
                required
                value={postForm.body}
                onChange={(e) => setPostForm({ ...postForm, body: e.target.value })}
                placeholder="Write article details here..."
                className="w-full bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-xl px-3.5 py-2.5 text-xs text-slate-900 dark:text-white focus:outline-none focus:border-blue-500 font-mono"
              />
            </div>

            {/* ACTION LINK / EMBEDDED BUTTON BUILDER */}
            <div className="p-4 rounded-2xl bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-700 space-y-3">
              <div className="font-bold text-xs text-slate-900 dark:text-white flex items-center gap-1.5">
                <LinkIcon className="w-4 h-4 text-blue-500" />
                <span>Embed Action Buttons (Google Forms, Donation, Volunteer, Links)</span>
              </div>

              {postForm.actionLinks.length > 0 && (
                <div className="space-y-2">
                  {postForm.actionLinks.map((link) => (
                    <div key={link.id} className="flex items-center justify-between p-2 rounded-xl bg-white dark:bg-slate-800 border text-xs">
                      <div className="truncate">
                        <span className="font-bold text-blue-600">{link.label}</span>
                        <span className="text-slate-400 ml-2">({link.type}): {link.url}</span>
                      </div>
                      <button
                        type="button"
                        onClick={() => handleRemoveActionLink(link.id)}
                        className="text-red-500 hover:text-red-700 p-1"
                      >
                        <X className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  ))}
                </div>
              )}

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
                <input
                  type="text"
                  placeholder="Button Label (e.g. Sign up via Google Form)"
                  value={newLinkLabel}
                  onChange={(e) => setNewLinkLabel(e.target.value)}
                  className="bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl px-3 py-1.5 text-xs text-slate-900 dark:text-white"
                />
                <input
                  type="text"
                  placeholder="URL (e.g. https://forms.google.com)"
                  value={newLinkUrl}
                  onChange={(e) => setNewLinkUrl(e.target.value)}
                  className="bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl px-3 py-1.5 text-xs text-slate-900 dark:text-white"
                />
                <div className="flex gap-2">
                  <select
                    value={newLinkType}
                    onChange={(e) => setNewLinkType(e.target.value)}
                    className="bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl px-2 py-1.5 text-xs text-slate-900 dark:text-white"
                  >
                    <option value="google_form">Google Form</option>
                    <option value="donation">Donation Form</option>
                    <option value="volunteer">Volunteer Form</option>
                    <option value="registration">Registration Page</option>
                    <option value="external">External Website</option>
                  </select>
                  <button
                    type="button"
                    onClick={handleAddActionLink}
                    className="bg-emerald-600 text-white font-bold px-3 py-1.5 rounded-xl text-xs shrink-0"
                  >
                    Add
                  </button>
                </div>
              </div>
            </div>

            <div className="flex justify-end gap-3 pt-2">
              <button
                type="submit"
                className="bg-emerald-600 hover:bg-emerald-500 text-white font-bold px-6 py-3 rounded-xl text-xs shadow-md"
              >
                {editingPostId ? "Update Article" : "Publish Article Now"}
              </button>
            </div>
          </form>
        </div>
      )}

      {/* TAB 3: MANAGE POSTS */}
      {activeTab === "manage" && (
        <div className="bg-white dark:bg-slate-800 p-6 rounded-3xl border border-slate-200 dark:border-slate-700 shadow-sm space-y-4">
          <h3 className="font-bold text-slate-900 dark:text-white text-lg">All Published Articles</h3>

          <div className="divide-y divide-slate-100 dark:divide-slate-700">
            {posts.map((post) => (
              <div key={post.id} className="py-4 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div className="space-y-1">
                  <div className="flex items-center gap-2">
                    <span className="font-bold text-slate-900 dark:text-white text-sm">{post.title}</span>
                    <span className="bg-blue-100 text-blue-700 text-[10px] font-bold px-2 py-0.5 rounded-full">
                      {post.category}
                    </span>
                  </div>
                  <div className="text-xs text-slate-500">
                    By {post.author} • Published on {new Date(post.publishedAt).toLocaleDateString()}
                  </div>
                </div>

                <div className="flex items-center gap-2 shrink-0">
                  <button
                    onClick={() => onSelectPost(post)}
                    className="p-2 rounded-lg bg-slate-100 dark:bg-slate-700 text-slate-700 dark:text-slate-200 hover:bg-slate-200 text-xs flex items-center gap-1"
                    title="Preview Post"
                  >
                    <Eye className="w-3.5 h-3.5" />
                  </button>
                  <button
                    onClick={() => handleEditClick(post)}
                    className="p-2 rounded-lg bg-blue-50 dark:bg-blue-950 text-blue-600 dark:text-blue-400 hover:bg-blue-100 text-xs flex items-center gap-1"
                  >
                    <Edit2 className="w-3.5 h-3.5" />
                    <span>Edit</span>
                  </button>
                  <button
                    onClick={() => handleDeleteClick(post.id)}
                    className="p-2 rounded-lg bg-red-50 dark:bg-red-950 text-red-600 dark:text-red-400 hover:bg-red-100 text-xs flex items-center gap-1"
                  >
                    <Trash2 className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* TAB 4: SUBMISSIONS */}
      {activeTab === "submissions" && (
        <div className="space-y-6">
          <div className="bg-white dark:bg-slate-800 p-6 rounded-3xl border border-slate-200 dark:border-slate-700 shadow-sm space-y-4">
            <h3 className="font-bold text-slate-900 dark:text-white text-base">Contact Messages ({submissions.contacts.length})</h3>
            {submissions.contacts.length === 0 ? (
              <p className="text-xs text-slate-500">No contact messages received yet.</p>
            ) : (
              <div className="space-y-3">
                {submissions.contacts.map((c) => (
                  <div key={c.id} className="p-4 rounded-2xl bg-slate-50 dark:bg-slate-900 border text-xs space-y-1">
                    <div className="flex justify-between font-bold text-slate-900 dark:text-white">
                      <span>{c.name} ({c.email})</span>
                      <span className="text-slate-400 font-normal">{new Date(c.createdAt).toLocaleDateString()}</span>
                    </div>
                    <p className="text-slate-700 dark:text-slate-300">{c.message}</p>
                  </div>
                ))}
              </div>
            )}
          </div>

          <div className="bg-white dark:bg-slate-800 p-6 rounded-3xl border border-slate-200 dark:border-slate-700 shadow-sm space-y-4">
            <h3 className="font-bold text-slate-900 dark:text-white text-base">Book Donation Requests ({submissions.donationRequests.length})</h3>
            {submissions.donationRequests.length === 0 ? (
              <p className="text-xs text-slate-500">No book donation requests received yet.</p>
            ) : (
              <div className="space-y-3">
                {submissions.donationRequests.map((d) => (
                  <div key={d.id} className="p-4 rounded-2xl bg-slate-50 dark:bg-slate-900 border text-xs space-y-1">
                    <div className="flex justify-between font-bold text-slate-900 dark:text-white">
                      <span>{d.name} • {d.bookCount} Books ({d.condition})</span>
                      <span className="text-emerald-600 font-semibold">{d.preferredOption}</span>
                    </div>
                    <div className="text-slate-500">Phone: {d.phone} | Email: {d.email}</div>
                    {d.address && <div className="text-slate-500">Address: {d.address}</div>}
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      )}

      {/* TAB 5: SETTINGS & PASSWORD CHANGE */}
      {activeTab === "settings" && (
        <div className="max-w-md mx-auto bg-white dark:bg-slate-800 p-8 rounded-3xl border border-slate-200 dark:border-slate-700 shadow-xl space-y-6">
          <h3 className="font-bold text-slate-900 dark:text-white text-lg">Administrator Security</h3>

          {passStatus.message && (
            <div
              className={`p-3 rounded-xl text-xs font-medium ${
                passStatus.type === "success" ? "bg-emerald-50 text-emerald-700" : "bg-red-50 text-red-700"
              }`}
            >
              {passStatus.message}
            </div>
          )}

          <form onSubmit={handleChangePass} className="space-y-4">
            <div>
              <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
                Current Password *
              </label>
              <input
                type="password"
                required
                value={passForm.currentPassword}
                onChange={(e) => setPassForm({ ...passForm, currentPassword: e.target.value })}
                className="w-full bg-slate-50 dark:bg-slate-900 border rounded-xl px-3.5 py-2.5 text-xs text-slate-900 dark:text-white"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
                New Password *
              </label>
              <input
                type="password"
                required
                value={passForm.newPassword}
                onChange={(e) => setPassForm({ ...passForm, newPassword: e.target.value })}
                className="w-full bg-slate-50 dark:bg-slate-900 border rounded-xl px-3.5 py-2.5 text-xs text-slate-900 dark:text-white"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
                Confirm New Password *
              </label>
              <input
                type="password"
                required
                value={passForm.confirmPassword}
                onChange={(e) => setPassForm({ ...passForm, confirmPassword: e.target.value })}
                className="w-full bg-slate-50 dark:bg-slate-900 border rounded-xl px-3.5 py-2.5 text-xs text-slate-900 dark:text-white"
              />
            </div>

            <button
              type="submit"
              className="w-full bg-blue-600 hover:bg-blue-500 text-white font-bold py-3 rounded-xl text-xs shadow-md"
            >
              Update Admin Password
            </button>
          </form>
        </div>
      )}

    </div>
  );
};
