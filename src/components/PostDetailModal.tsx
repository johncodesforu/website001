import React from "react";
import { X, Calendar, User, Tag, ExternalLink, Heart, FileText, UserPlus, CheckCircle } from "lucide-react";
import { BlogPost } from "../types";

interface PostDetailModalProps {
  post: BlogPost | null;
  onClose: () => void;
  onNavigate: (page: string) => void;
}

export const PostDetailModal: React.FC<PostDetailModalProps> = ({ post, onClose, onNavigate }) => {
  if (!post) return null;

  const getActionIcon = (type: string) => {
    switch (type) {
      case "google_form":
        return <FileText className="w-4 h-4 text-purple-400" />;
      case "donation":
        return <Heart className="w-4 h-4 text-emerald-400" />;
      case "volunteer":
        return <UserPlus className="w-4 h-4 text-blue-400" />;
      case "registration":
        return <CheckCircle className="w-4 h-4 text-amber-400" />;
      default:
        return <ExternalLink className="w-4 h-4 text-slate-400" />;
    }
  };

  const handleActionClick = (url: string) => {
    if (url.startsWith("/")) {
      const page = url.replace("/", "");
      onNavigate(page || "home");
      onClose();
    } else {
      window.open(url, "_blank", "noopener,noreferrer");
    }
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/70 backdrop-blur-md flex items-center justify-center p-3 sm:p-6 overflow-y-auto animate-in fade-in duration-200">
      <div className="bg-white dark:bg-slate-900 text-slate-900 dark:text-white max-w-3xl w-full rounded-3xl overflow-hidden shadow-2xl border border-slate-200 dark:border-slate-800 my-auto flex flex-col max-h-[90vh]">
        
        {/* Cover Image & Header */}
        <div className="relative h-64 sm:h-80 w-full shrink-0 overflow-hidden bg-slate-900">
          <img
            src={post.coverImage}
            alt={post.title}
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/40 to-transparent" />

          {/* Category Pill */}
          <div className="absolute top-4 left-4 z-10">
            <span className="bg-blue-600 text-white text-xs font-semibold px-3 py-1 rounded-full shadow-lg flex items-center gap-1.5">
              <Tag className="w-3.5 h-3.5" />
              <span>{post.category}</span>
            </span>
          </div>

          {/* Close Button */}
          <button
            onClick={onClose}
            className="absolute top-4 right-4 z-10 p-2 rounded-full bg-slate-900/80 text-white hover:bg-slate-800 backdrop-blur-md transition-colors"
            aria-label="Close modal"
          >
            <X className="w-5 h-5" />
          </button>

          {/* Title Overlay */}
          <div className="absolute bottom-4 left-4 right-4 z-10 space-y-2">
            <h2 className="text-xl sm:text-2xl font-bold text-white leading-tight">
              {post.title}
            </h2>
            <div className="flex flex-wrap items-center gap-4 text-xs text-slate-300">
              <span className="flex items-center gap-1">
                <User className="w-3.5 h-3.5 text-blue-400" />
                <span>{post.author}</span>
              </span>
              <span className="flex items-center gap-1">
                <Calendar className="w-3.5 h-3.5 text-emerald-400" />
                <span>{new Date(post.publishedAt).toLocaleDateString("en-US", { month: "long", day: "numeric", year: "numeric" })}</span>
              </span>
            </div>
          </div>
        </div>

        {/* Scrollable Post Content */}
        <div className="p-6 sm:p-8 overflow-y-auto space-y-6 text-slate-700 dark:text-slate-300 text-sm leading-relaxed">
          {/* Summary Callout */}
          <div className="p-4 rounded-2xl bg-blue-50 dark:bg-blue-950/40 border-l-4 border-blue-600 font-medium text-slate-800 dark:text-slate-200">
            {post.summary}
          </div>

          {/* Body Content */}
          <div className="prose dark:prose-invert max-w-none space-y-4">
            {post.body.split("\n\n").map((paragraph, index) => {
              if (paragraph.startsWith("### ")) {
                return (
                  <h3 key={index} className="text-lg font-bold text-slate-900 dark:text-white pt-2">
                    {paragraph.replace("### ", "")}
                  </h3>
                );
              }
              if (paragraph.startsWith("1. ") || paragraph.startsWith("- ")) {
                const items = paragraph.split("\n");
                return (
                  <ul key={index} className="list-disc pl-5 space-y-1">
                    {items.map((item, i) => (
                      <li key={i}>{item.replace(/^[0-9]+\.\s+|^-\s+/, "")}</li>
                    ))}
                  </ul>
                );
              }
              if (paragraph.startsWith("> ")) {
                return (
                  <blockquote key={index} className="border-l-4 border-emerald-500 pl-4 py-1 italic text-slate-600 dark:text-slate-400 my-2">
                    {paragraph.replace("> ", "")}
                  </blockquote>
                );
              }
              return <p key={index}>{paragraph}</p>;
            })}
          </div>

          {/* Action Links & Embed Buttons */}
          {post.actionLinks && post.actionLinks.length > 0 && (
            <div className="pt-6 border-t border-slate-200 dark:border-slate-800 space-y-3">
              <h4 className="font-semibold text-slate-900 dark:text-white text-xs uppercase tracking-wider">
                Embedded Forms & Resources
              </h4>
              <div className="flex flex-wrap gap-2.5">
                {post.actionLinks.map((link) => (
                  <button
                    key={link.id}
                    onClick={() => handleActionClick(link.url)}
                    className="bg-slate-100 dark:bg-slate-800 hover:bg-blue-600 hover:text-white dark:hover:bg-blue-600 text-slate-800 dark:text-slate-200 text-xs font-semibold px-4 py-2.5 rounded-xl border border-slate-200 dark:border-slate-700 transition-all flex items-center gap-2 group shadow-xs"
                  >
                    {getActionIcon(link.type)}
                    <span>{link.label}</span>
                  </button>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="p-4 bg-slate-50 dark:bg-slate-900/80 border-t border-slate-200 dark:border-slate-800 flex items-center justify-between">
          <span className="text-xs text-slate-500">Turning Pages Together Official Update</span>
          <button
            onClick={onClose}
            className="bg-slate-900 dark:bg-white text-white dark:text-slate-900 text-xs font-semibold px-4 py-2 rounded-xl hover:opacity-90 transition-opacity"
          >
            Close Article
          </button>
        </div>

      </div>
    </div>
  );
};
