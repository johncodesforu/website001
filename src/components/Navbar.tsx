import React, { useState, useEffect } from "react";
import { BookOpen, Menu, X, Sun, Moon, Shield, Heart, ArrowRight } from "lucide-react";

interface NavbarProps {
  currentPage: string;
  setCurrentPage: (page: string) => void;
  darkMode: boolean;
  setDarkMode: (dark: boolean) => void;
  isAdminLoggedIn: boolean;
}

export const Navbar: React.FC<NavbarProps> = ({
  currentPage,
  setCurrentPage,
  darkMode,
  setDarkMode,
  isAdminLoggedIn,
}) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navItems = [
    { id: "home", label: "Home" },
    { id: "about", label: "About Us" },
    { id: "mission", label: "Our Mission" },
    { id: "blog", label: "Blog / Updates" },
    { id: "get-involved", label: "Get Involved" },
    { id: "donate-books", label: "Donate Books" },
    { id: "contact", label: "Contact" },
  ];

  const handleNavClick = (id: string) => {
    setCurrentPage(id);
    setMobileMenuOpen(false);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <header
      id="main-header"
      className={`sticky top-0 z-50 transition-all duration-300 ${
        isScrolled
          ? "bg-white/90 dark:bg-slate-900/90 backdrop-blur-md shadow-sm border-b border-slate-200/60 dark:border-slate-800/60 py-3"
          : "bg-white/70 dark:bg-slate-900/70 backdrop-blur-sm border-b border-slate-100 dark:border-slate-800/40 py-4"
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <button
            id="logo-brand-button"
            onClick={() => handleNavClick("home")}
            className="flex items-center gap-3 group text-left focus:outline-none"
          >
            <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-blue-600 via-blue-500 to-emerald-500 flex items-center justify-center text-white shadow-md shadow-blue-500/20 group-hover:scale-105 transition-transform duration-200">
              <BookOpen className="w-5.5 h-5.5" />
            </div>
            <div>
              <span className="font-bold text-lg sm:text-xl tracking-tight text-slate-900 dark:text-white block leading-none">
                Turning Pages <span className="text-blue-600 dark:text-blue-400">Together</span>
              </span>
              <span className="text-[11px] font-medium tracking-wide uppercase text-slate-500 dark:text-slate-400 block mt-0.5">
                Nonprofit Literacy Alliance
              </span>
            </div>
          </button>

          {/* Desktop Nav Items */}
          <nav id="desktop-navigation" className="hidden lg:flex items-center gap-1 xl:gap-2">
            {navItems.map((item) => {
              const isActive = currentPage === item.id;
              return (
                <button
                  key={item.id}
                  id={`nav-link-${item.id}`}
                  onClick={() => handleNavClick(item.id)}
                  className={`px-3 py-2 rounded-lg text-sm font-medium transition-all duration-150 ${
                    isActive
                      ? "text-blue-600 dark:text-blue-400 bg-blue-50 dark:bg-blue-950/40 font-semibold"
                      : "text-slate-600 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white hover:bg-slate-100/70 dark:hover:bg-slate-800/50"
                  }`}
                >
                  {item.label}
                </button>
              );
            })}
          </nav>

          {/* Action CTAs & Controls */}
          <div className="hidden sm:flex items-center gap-3">
            {/* Dark Mode Toggle */}
            <button
              id="dark-mode-toggle-desktop"
              onClick={() => setDarkMode(!darkMode)}
              aria-label="Toggle dark mode"
              className="p-2 rounded-lg text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
            >
              {darkMode ? <Sun className="w-5 h-5 text-amber-400" /> : <Moon className="w-5 h-5" />}
            </button>

            {/* Admin Portal Shortcut */}
            <button
              id="admin-portal-nav-button"
              onClick={() => handleNavClick("admin")}
              title="Administrator Portal"
              className={`p-2 rounded-lg transition-colors flex items-center gap-1 text-xs font-medium ${
                currentPage === "admin"
                  ? "bg-slate-900 text-white dark:bg-white dark:text-slate-900"
                  : isAdminLoggedIn
                  ? "bg-emerald-100 dark:bg-emerald-950/60 text-emerald-700 dark:text-emerald-300 border border-emerald-300 dark:border-emerald-700"
                  : "text-slate-500 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800"
              }`}
            >
              <Shield className="w-4 h-4" />
              {isAdminLoggedIn && <span className="hidden xl:inline">Admin</span>}
            </button>

            {/* Primary Action Button */}
            <button
              id="primary-donate-cta-nav"
              onClick={() => handleNavClick("donate-books")}
              className="bg-emerald-600 hover:bg-emerald-500 text-white px-4 py-2 rounded-xl text-sm font-semibold shadow-md shadow-emerald-600/20 hover:shadow-emerald-600/30 transition-all flex items-center gap-2 group"
            >
              <Heart className="w-4 h-4 fill-white/20 group-hover:scale-110 transition-transform" />
              <span>Donate Books</span>
            </button>
          </div>

          {/* Mobile Menu Toggle Button */}
          <div className="flex sm:hidden items-center gap-2">
            <button
              id="dark-mode-toggle-mobile"
              onClick={() => setDarkMode(!darkMode)}
              className="p-2 rounded-lg text-slate-600 dark:text-slate-300"
            >
              {darkMode ? <Sun className="w-5 h-5 text-amber-400" /> : <Moon className="w-5 h-5" />}
            </button>
            <button
              id="mobile-hamburger-toggle"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 rounded-lg text-slate-700 dark:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-800"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div id="mobile-drawer" className="lg:hidden bg-white/95 dark:bg-slate-900/95 backdrop-blur-lg border-b border-slate-200 dark:border-slate-800 px-4 pt-3 pb-6 shadow-xl animate-in slide-in-from-top duration-200">
          <div className="space-y-1">
            {navItems.map((item) => {
              const isActive = currentPage === item.id;
              return (
                <button
                  key={item.id}
                  id={`mobile-nav-link-${item.id}`}
                  onClick={() => handleNavClick(item.id)}
                  className={`w-full text-left px-4 py-3 rounded-xl text-base font-medium transition-colors ${
                    isActive
                      ? "bg-blue-50 dark:bg-blue-950/50 text-blue-600 dark:text-blue-400 font-semibold"
                      : "text-slate-700 dark:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-800"
                  }`}
                >
                  {item.label}
                </button>
              );
            })}
          </div>

          <div className="mt-4 pt-4 border-t border-slate-200 dark:border-slate-800 space-y-2">
            <button
              id="mobile-donate-cta"
              onClick={() => handleNavClick("donate-books")}
              className="w-full bg-emerald-600 text-white font-semibold py-3 px-4 rounded-xl shadow-md flex items-center justify-center gap-2"
            >
              <Heart className="w-5 h-5" />
              <span>Donate Books Now</span>
            </button>

            <button
              id="mobile-admin-cta"
              onClick={() => handleNavClick("admin")}
              className="w-full bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-200 font-medium py-2.5 px-4 rounded-xl flex items-center justify-center gap-2 text-sm"
            >
              <Shield className="w-4 h-4" />
              <span>Administrator Dashboard</span>
            </button>
          </div>
        </div>
      )}
    </header>
  );
};
