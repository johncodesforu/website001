import { BlogPost, ContactSubmission, DonationRequest, VolunteerSignup, AdminStats } from "../types";

const TOKEN_KEY = "tpt_admin_token";

export function getAdminToken(): string | null {
  return localStorage.getItem(TOKEN_KEY);
}

export function setAdminToken(token: string | null) {
  if (token) {
    localStorage.setItem(TOKEN_KEY, token);
  } else {
    localStorage.removeItem(TOKEN_KEY);
  }
}

// API Fetch Helper
async function apiFetch(endpoint: string, options: RequestInit = {}) {
  const token = getAdminToken();
  const headers: Record<string, string> = {
    "Content-Type": "application/json",
    ...(options.headers as Record<string, string>),
  };

  if (token) {
    headers["Authorization"] = `Bearer ${token}`;
  }

  const res = await fetch(endpoint, {
    ...options,
    headers,
  });

  if (!res.ok) {
    const errorData = await res.json().catch(() => ({ error: "Request failed" }));
    throw new Error(errorData.error || `Error ${res.status}: ${res.statusText}`);
  }

  return res.json();
}

// 1. Posts API
export async function fetchPosts(): Promise<BlogPost[]> {
  try {
    return await apiFetch("/api/posts");
  } catch (err) {
    console.warn("Failed to fetch posts from backend, returning local cache", err);
    return [];
  }
}

export async function createPost(postData: Partial<BlogPost>): Promise<BlogPost> {
  return apiFetch("/api/posts", {
    method: "POST",
    body: JSON.stringify(postData),
  });
}

export async function updatePost(id: string, postData: Partial<BlogPost>): Promise<BlogPost> {
  return apiFetch(`/api/posts/${id}`, {
    method: "PUT",
    body: JSON.stringify(postData),
  });
}

export async function deletePost(id: string): Promise<{ success: boolean }> {
  return apiFetch(`/api/posts/${id}`, {
    method: "DELETE",
  });
}

// 2. Auth API
export async function loginAdmin(email: string, password: string): Promise<{ token: string; user: any }> {
  const data = await apiFetch("/api/auth/login", {
    method: "POST",
    body: JSON.stringify({ email, password }),
  });
  if (data.token) {
    setAdminToken(data.token);
  }
  return data;
}

export async function checkAdminAuth(): Promise<boolean> {
  const token = getAdminToken();
  if (!token) return false;
  try {
    const data = await apiFetch("/api/auth/me");
    return data.isAuthenticated;
  } catch {
    setAdminToken(null);
    return false;
  }
}

export async function logoutAdmin(): Promise<void> {
  try {
    await apiFetch("/api/auth/logout", { method: "POST" });
  } catch (e) {
    console.error("Logout error", e);
  } finally {
    setAdminToken(null);
  }
}

export async function changeAdminPassword(currentPassword: string, newPassword: string) {
  return apiFetch("/api/auth/change-password", {
    method: "POST",
    body: JSON.stringify({ currentPassword, newPassword }),
  });
}

// 3. Admin Stats & Submissions
export async function fetchAdminStats(): Promise<AdminStats> {
  return apiFetch("/api/admin/stats");
}

export async function fetchAdminSubmissions(): Promise<{
  contacts: ContactSubmission[];
  donationRequests: DonationRequest[];
  volunteers: VolunteerSignup[];
}> {
  return apiFetch("/api/admin/submissions");
}

// 4. Public Form Submissions
export async function submitContactForm(data: { name: string; email: string; phone?: string; message: string }) {
  return apiFetch("/api/contact", {
    method: "POST",
    body: JSON.stringify(data),
  });
}

export async function submitDonationRequest(data: {
  name: string;
  email: string;
  phone: string;
  bookCount: number;
  condition: string;
  preferredOption: string;
  address?: string;
  notes?: string;
}) {
  return apiFetch("/api/donations/request", {
    method: "POST",
    body: JSON.stringify(data),
  });
}

export async function submitVolunteerSignup(data: {
  name: string;
  email: string;
  phone: string;
  role: string;
  availability: string;
  notes?: string;
}) {
  return apiFetch("/api/volunteers", {
    method: "POST",
    body: JSON.stringify(data),
  });
}
