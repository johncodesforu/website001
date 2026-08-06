import React, { useState, useEffect } from "react";
import { Navbar } from "./components/Navbar";
import { Footer } from "./components/Footer";
import { PostDetailModal } from "./components/PostDetailModal";
import { HomePage } from "./pages/HomePage";
import { AboutPage } from "./pages/AboutPage";
import { MissionPage } from "./pages/MissionPage";
import { BlogPage } from "./pages/BlogPage";
import { GetInvolvedPage } from "./pages/GetInvolvedPage";
import { DonateBooksPage } from "./pages/DonateBooksPage";
import { ContactPage } from "./pages/ContactPage";
import { AdminPage } from "./pages/AdminPage";
import { BlogPost } from "./types";
import { fetchPosts, checkAdminAuth } from "./lib/api";

export default function App() {
  const [currentPage, setCurrentPage] = useState<string>("home");
  const [darkMode, setDarkMode] = useState<boolean>(() => {
    return localStorage.getItem("tpt_theme") === "dark";
  });
  const [posts, setPosts] = useState<BlogPost[]>([]);
  const [selectedPost, setSelectedPost] = useState<BlogPost | null>(null);
  const [isAdminLoggedIn, setIsAdminLoggedIn] = useState<boolean>(false);
  const [loadingPosts, setLoadingPosts] = useState<boolean>(true);

  // Sync dark mode class on <html> element
  useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add("dark");
      localStorage.setItem("tpt_theme", "dark");
    } else {
      document.documentElement.classList.remove("dark");
      localStorage.setItem("tpt_theme", "light");
    }
  }, [darkMode]);

  // Load posts and auth check on mount
  useEffect(() => {
    loadPosts();
    checkAdminAuth().then((auth) => setIsAdminLoggedIn(auth));
  }, []);

  const loadPosts = async () => {
    setLoadingPosts(true);
    try {
      const fetched = await fetchPosts();
      setPosts(fetched);
    } catch (err) {
      console.error("Error fetching posts", err);
    } finally {
      setLoadingPosts(false);
    }
  };

  const handleNavigate = (page: string) => {
    setCurrentPage(page);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <div className="min-h-screen bg-[#F8FAFC] dark:bg-slate-950 text-[#111827] dark:text-slate-100 font-sans flex flex-col selection:bg-blue-500 selection:text-white transition-colors duration-200">
      
      {/* Sticky Top Header */}
      <Navbar
        currentPage={currentPage}
        setCurrentPage={handleNavigate}
        darkMode={darkMode}
        setDarkMode={setDarkMode}
        isAdminLoggedIn={isAdminLoggedIn}
      />

      {/* Main Content Area */}
      <main className="flex-1">
        {currentPage === "home" && (
          <HomePage
            posts={posts}
            onNavigate={handleNavigate}
            onSelectPost={(post) => setSelectedPost(post)}
          />
        )}

        {currentPage === "about" && (
          <AboutPage onNavigate={handleNavigate} />
        )}

        {currentPage === "mission" && (
          <MissionPage onNavigate={handleNavigate} />
        )}

        {currentPage === "blog" && (
          <BlogPage
            posts={posts}
            isAdminLoggedIn={isAdminLoggedIn}
            onSelectPost={(post) => setSelectedPost(post)}
            onNavigate={handleNavigate}
          />
        )}

        {currentPage === "get-involved" && (
          <GetInvolvedPage onNavigate={handleNavigate} />
        )}

        {currentPage === "donate-books" && (
          <DonateBooksPage onNavigate={handleNavigate} />
        )}

        {currentPage === "contact" && (
          <ContactPage />
        )}

        {currentPage === "admin" && (
          <AdminPage
            isAdminLoggedIn={isAdminLoggedIn}
            setIsAdminLoggedIn={setIsAdminLoggedIn}
            onRefreshPosts={loadPosts}
            onSelectPost={(post) => setSelectedPost(post)}
          />
        )}
      </main>

      {/* Article Reader Modal */}
      {selectedPost && (
        <PostDetailModal
          post={selectedPost}
          onClose={() => setSelectedPost(null)}
          onNavigate={handleNavigate}
        />
      )}

      {/* Footer */}
      <Footer setCurrentPage={handleNavigate} />

    </div>
  );
}
