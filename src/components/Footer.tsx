import React, { useState } from "react";
import { BookOpen, Phone, Mail, MapPin, Heart, ExternalLink, ShieldCheck, ArrowUpRight } from "lucide-react";

interface FooterProps {
  setCurrentPage: (page: string) => void;
}

export const Footer: React.FC<FooterProps> = ({ setCurrentPage }) => {
  const [modalType, setModalType] = useState<"privacy" | "terms" | null>(null);

  const handleNav = (page: string) => {
    setCurrentPage(page);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <footer id="main-footer" className="bg-slate-900 text-slate-300 pt-16 pb-12 border-t border-slate-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10 pb-12 border-b border-slate-800">
          
          {/* Brand & Mission Column */}
          <div className="lg:col-span-2 space-y-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-blue-600 via-blue-500 to-emerald-500 flex items-center justify-center text-white shadow-md">
                <BookOpen className="w-5.5 h-5.5" />
              </div>
              <span className="font-bold text-xl tracking-tight text-white block">
                Turning Pages <span className="text-blue-400">Together</span>
              </span>
            </div>

            <p className="text-slate-400 text-sm leading-relaxed max-w-sm">
              Turning Pages Together is a 501(c)(3) nonprofit organization dedicated to improving youth literacy by collecting and distributing free books to children, families, schools, and underserved communities.
            </p>

            <div className="pt-2 space-y-2 text-sm text-slate-300">
              <a
                href="tel:+19255778603"
                className="flex items-center gap-2 hover:text-white transition-colors group"
              >
                <div className="w-8 h-8 rounded-lg bg-slate-800 flex items-center justify-center text-blue-400 group-hover:bg-blue-600 group-hover:text-white transition-colors">
                  <Phone className="w-4 h-4" />
                </div>
                <span>+1 (925) 577-8603</span>
              </a>

              <a
                href="mailto:turningpagestogetherofficial@gmail.com"
                className="flex items-center gap-2 hover:text-white transition-colors group"
              >
                <div className="w-8 h-8 rounded-lg bg-slate-800 flex items-center justify-center text-emerald-400 group-hover:bg-emerald-600 group-hover:text-white transition-colors">
                  <Mail className="w-4 h-4" />
                </div>
                <span className="break-all">turningpagestogetherofficial@gmail.com</span>
              </a>

              <div className="flex items-center gap-2 text-slate-400 text-xs pt-1">
                <MapPin className="w-4 h-4 text-blue-400 shrink-0" />
                <span>San Francisco Bay Area Collection Hub & Literacy Network</span>
              </div>
            </div>
          </div>

          {/* Quick Links Column */}
          <div className="space-y-3">
            <h3 className="text-white font-semibold text-sm uppercase tracking-wider">Quick Links</h3>
            <ul className="space-y-2 text-sm">
              <li>
                <button onClick={() => handleNav("home")} className="hover:text-white transition-colors">
                  Home
                </button>
              </li>
              <li>
                <button onClick={() => handleNav("about")} className="hover:text-white transition-colors">
                  About Us
                </button>
              </li>
              <li>
                <button onClick={() => handleNav("mission")} className="hover:text-white transition-colors">
                  Our Mission
                </button>
              </li>
              <li>
                <button onClick={() => handleNav("blog")} className="hover:text-white transition-colors">
                  Blog & News Updates
                </button>
              </li>
              <li>
                <button onClick={() => handleNav("contact")} className="hover:text-white transition-colors">
                  Contact Us
                </button>
              </li>
            </ul>
          </div>

          {/* Programs & Action Column */}
          <div className="space-y-3">
            <h3 className="text-white font-semibold text-sm uppercase tracking-wider">Get Involved</h3>
            <ul className="space-y-2 text-sm">
              <li>
                <button onClick={() => handleNav("donate-books")} className="hover:text-white transition-colors flex items-center gap-1">
                  <span>Donate Books</span>
                  <Heart className="w-3.5 h-3.5 text-emerald-400" />
                </button>
              </li>
              <li>
                <button onClick={() => handleNav("get-involved")} className="hover:text-white transition-colors">
                  Volunteer Opportunities
                </button>
              </li>
              <li>
                <button onClick={() => handleNav("get-involved")} className="hover:text-white transition-colors">
                  Host a Book Drive
                </button>
              </li>
              <li>
                <button onClick={() => handleNav("get-involved")} className="hover:text-white transition-colors">
                  School Partnerships
                </button>
              </li>
              <li>
                <button onClick={() => handleNav("admin")} className="hover:text-emerald-400 transition-colors text-xs text-slate-400 flex items-center gap-1 mt-2">
                  <ShieldCheck className="w-3.5 h-3.5" />
                  <span>Admin Portal</span>
                </button>
              </li>
            </ul>
          </div>

          {/* Newsletter / Impact Card */}
          <div className="space-y-3 bg-slate-800/60 p-5 rounded-2xl border border-slate-700/60">
            <h3 className="text-white font-semibold text-sm">Join Our Literacy Circle</h3>
            <p className="text-xs text-slate-400 leading-normal">
              Receive inspiring monthly stories, book drive highlights, and volunteer callouts.
            </p>
            <form onSubmit={(e) => { e.preventDefault(); alert("Thank you for joining our newsletter list!"); }} className="space-y-2">
              <input
                type="email"
                required
                placeholder="Enter your email"
                className="w-full bg-slate-900 border border-slate-700 rounded-xl px-3 py-2 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-blue-500"
              />
              <button
                type="submit"
                className="w-full bg-blue-600 hover:bg-blue-500 text-white font-semibold py-2 px-3 rounded-xl text-xs transition-colors flex items-center justify-center gap-1"
              >
                <span>Subscribe</span>
                <ArrowUpRight className="w-3.5 h-3.5" />
              </button>
            </form>
          </div>

        </div>

        {/* Bottom Bar */}
        <div className="pt-8 flex flex-col md:flex-row items-center justify-between text-xs text-slate-500 gap-4">
          <p>© {new Date().getFullYear()} Turning Pages Together Nonprofit Organization. All rights reserved.</p>
          <div className="flex items-center gap-6">
            <button onClick={() => setModalType("privacy")} className="hover:text-slate-300 transition-colors">
              Privacy Policy
            </button>
            <button onClick={() => setModalType("terms")} className="hover:text-slate-300 transition-colors">
              Terms of Service
            </button>
            <button onClick={() => handleNav("admin")} className="hover:text-slate-300 transition-colors">
              Admin Login
            </button>
          </div>
        </div>
      </div>

      {/* Policy Modal */}
      {modalType && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-white dark:bg-slate-900 text-slate-900 dark:text-white max-w-lg w-full rounded-2xl p-6 shadow-2xl border border-slate-200 dark:border-slate-800 space-y-4">
            <h3 className="text-lg font-bold">
              {modalType === "privacy" ? "Privacy Policy" : "Terms of Service"}
            </h3>
            <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed">
              {modalType === "privacy"
                ? "Turning Pages Together values your privacy. We collect contact details strictly for organizing book donations, volunteer scheduling, and sending literacy news updates. We never sell or share donor or volunteer information with third parties."
                : "By accessing Turning Pages Together, you agree to support our mission of expanding literacy. Book donations must comply with our accepted condition guidelines to ensure safe, inspiring reading materials for children."}
            </p>
            <div className="flex justify-end pt-2">
              <button
                onClick={() => setModalType(null)}
                className="bg-blue-600 text-white text-xs font-semibold px-4 py-2 rounded-xl"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </footer>
  );
};
