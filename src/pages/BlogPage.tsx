import React, { useState } from "react";
import { Search, Tag, Calendar, User, ArrowRight, PlusCircle, Sparkles, Filter, FileText, Heart, ExternalLink, CheckCircle } from "lucide-react";
import { BlogPost } from "../types";

interface BlogPageProps {
  posts: BlogPost[];
  isAdminLoggedIn: boolean;
  onSelectPost: (post: BlogPost) => void;
  onNavigate: (page: string) => void;
}

export const BlogPage: React.FC<BlogPageProps> = ({
  posts,
  isAdminLoggedIn,
  onSelectPost,
  onNavigate,
}) => {
  const [selectedCategory, setSelectedCategory] = useState<string>("All");
  const [searchQuery, setSearchQuery] = useState<string>("");

  const categories = ["All", "Book Drives", "Success Stories", "News", "Events"];

  const filteredPosts = posts.filter((post) => {
    const matchesCategory = selectedCategory === "All" || post.category === selectedCategory;
    const matchesSearch =
      post.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      post.summary.toLowerCase().includes(searchQuery.toLowerCase()) ||
      post.body.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  return (
    <div id="blog-page-container" className="space-y-12 pb-20">
      
      {/* HEADER */}
      <section className="bg-gradient-to-b from-blue-50 via-slate-50 to-white dark:from-slate-900 dark:via-slate-900 dark:to-slate-950 py-12 lg:py-16 border-b border-slate-200/60 dark:border-slate-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-4">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-blue-100 dark:bg-blue-950 text-blue-700 dark:text-blue-300 text-xs font-semibold">
            <Sparkles className="w-3.5 h-3.5" />
            <span>Community News & Updates</span>
          </div>

          <h1 className="text-3xl sm:text-5xl font-extrabold text-slate-900 dark:text-white tracking-tight">
            Turning Pages <span className="text-blue-600 dark:text-blue-400">Journal & News</span>
          </h1>

          <p className="text-slate-600 dark:text-slate-300 text-base sm:text-lg max-w-2xl mx-auto leading-relaxed">
            Stay updated with our latest book drives, school distributions, volunteer stories, and community milestones.
          </p>

          {/* Admin Publish Banner */}
          {isAdminLoggedIn && (
            <div className="pt-2">
              <button
                onClick={() => onNavigate("admin")}
                className="bg-emerald-600 hover:bg-emerald-500 text-white font-semibold text-xs px-5 py-2.5 rounded-full shadow-lg inline-flex items-center gap-2 transition-transform hover:scale-105"
              >
                <PlusCircle className="w-4 h-4" />
                <span>Publish New Post / Manage Blog (Admin Mode)</span>
              </button>
            </div>
          )}
        </div>
      </section>

      {/* FILTER & SEARCH BAR */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-6">
        <div className="flex flex-col md:flex-row items-center justify-between gap-4 bg-white dark:bg-slate-800 p-4 rounded-2xl border border-slate-200 dark:border-slate-700 shadow-sm">
          
          {/* Category Pills */}
          <div className="flex flex-wrap items-center gap-2 w-full md:w-auto">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={`px-3.5 py-1.5 rounded-xl text-xs font-semibold transition-all ${
                  selectedCategory === cat
                    ? "bg-blue-600 text-white shadow-sm"
                    : "bg-slate-100 dark:bg-slate-700/60 text-slate-600 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-slate-700"
                }`}
              >
                {cat}
              </button>
            ))}
          </div>

          {/* Search Box */}
          <div className="relative w-full md:w-72">
            <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search posts or topics..."
              className="w-full bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-xl pl-9 pr-4 py-2 text-xs text-slate-900 dark:text-white placeholder-slate-400 focus:outline-none focus:border-blue-500"
            />
          </div>

        </div>

        {/* POSTS GRID */}
        {filteredPosts.length === 0 ? (
          <div className="text-center py-16 bg-white dark:bg-slate-800 rounded-3xl border border-slate-200 dark:border-slate-700 p-8 space-y-3">
            <Filter className="w-8 h-8 text-slate-400 mx-auto" />
            <h3 className="font-bold text-slate-900 dark:text-white text-base">No matching updates found</h3>
            <p className="text-xs text-slate-500 max-w-sm mx-auto">
              Try adjusting your category filter or search terms to find stories.
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredPosts.map((post) => (
              <article
                key={post.id}
                onClick={() => onSelectPost(post)}
                className="bg-white dark:bg-slate-800 rounded-3xl overflow-hidden border border-slate-200 dark:border-slate-700 shadow-sm hover:shadow-xl transition-all duration-300 flex flex-col cursor-pointer group"
              >
                {/* Cover Image */}
                <div className="h-52 w-full relative overflow-hidden bg-slate-900">
                  <img
                    src={post.coverImage}
                    alt={post.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute top-3 left-3">
                    <span className="bg-blue-600/90 backdrop-blur-md text-white text-[11px] font-semibold px-2.5 py-1 rounded-full border border-blue-400/30 flex items-center gap-1 shadow-sm">
                      <Tag className="w-3 h-3" />
                      <span>{post.category}</span>
                    </span>
                  </div>

                  {/* Scheduled or Draft Status Badge */}
                  {post.status !== "published" && (
                    <div className="absolute top-3 right-3">
                      <span className="bg-amber-500 text-slate-950 text-[10px] font-bold px-2 py-0.5 rounded-full uppercase">
                        {post.status}
                      </span>
                    </div>
                  )}
                </div>

                {/* Body Content */}
                <div className="p-6 flex-1 flex flex-col justify-between space-y-4">
                  <div className="space-y-2">
                    <div className="flex items-center gap-2 text-xs text-slate-500 dark:text-slate-400">
                      <Calendar className="w-3.5 h-3.5 text-blue-500" />
                      <span>{new Date(post.publishedAt).toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" })}</span>
                      <span>•</span>
                      <User className="w-3.5 h-3.5 text-emerald-500" />
                      <span className="truncate max-w-[120px]">{post.author}</span>
                    </div>

                    <h2 className="font-bold text-slate-900 dark:text-white text-lg group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors line-clamp-2 leading-snug">
                      {post.title}
                    </h2>

                    <p className="text-slate-600 dark:text-slate-300 text-xs leading-relaxed line-clamp-3">
                      {post.summary}
                    </p>
                  </div>

                  {/* Action Link Pills Preview */}
                  {post.actionLinks && post.actionLinks.length > 0 && (
                    <div className="pt-2 flex flex-wrap gap-1.5 border-t border-slate-100 dark:border-slate-700/60">
                      {post.actionLinks.slice(0, 2).map((link) => (
                        <span
                          key={link.id}
                          className="bg-blue-50 dark:bg-blue-950/60 text-blue-700 dark:text-blue-300 text-[10px] font-medium px-2 py-0.5 rounded-md flex items-center gap-1"
                        >
                          <ExternalLink className="w-2.5 h-2.5" />
                          <span className="truncate max-w-[140px]">{link.label}</span>
                        </span>
                      ))}
                    </div>
                  )}

                  <div className="pt-2 flex items-center justify-between text-xs font-semibold text-blue-600 dark:text-blue-400">
                    <span>Read Article & Links</span>
                    <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                  </div>
                </div>
              </article>
            ))}
          </div>
        )}
      </section>

    </div>
  );
};
