import React, { useState } from "react";
import { Users, Heart, Package, Calendar, CheckCircle2, ArrowRight, Building, Sparkles, Send, FileText } from "lucide-react";
import { submitVolunteerSignup } from "../lib/api";

interface GetInvolvedPageProps {
  onNavigate: (page: string) => void;
}

export const GetInvolvedPage: React.FC<GetInvolvedPageProps> = ({ onNavigate }) => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    role: "book_sorter",
    availability: "Weekends",
    notes: ""
  });
  const [status, setStatus] = useState<{ type: "success" | "error" | null; message: string }>({ type: null, message: "" });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setStatus({ type: null, message: "" });

    try {
      const res = await submitVolunteerSignup(formData);
      setStatus({ type: "success", message: res.message || "Thank you for volunteering! Our team will reach out with upcoming sorting dates." });
      setFormData({
        name: "",
        email: "",
        phone: "",
        role: "book_sorter",
        availability: "Weekends",
        notes: ""
      });
    } catch (err: any) {
      setStatus({ type: "error", message: err.message || "Failed to submit volunteer form. Please try again." });
    } finally {
      setIsSubmitting(false);
    }
  };

  const volunteerRoles = [
    {
      id: "book_sorter",
      title: "Book Sorting & Quality Inspection",
      desc: "Inspect, sanitize, and categorize donated books by age group and reading level at our Bay Area collection hub.",
      time: "2-3 hours / week",
      icon: Package
    },
    {
      id: "drive_host",
      title: "Host a Neighborhood Book Drive",
      desc: "Set up collection boxes at your school, workplace, or youth club. We provide bins, flyers, and logistics support.",
      time: "Flexible 1-2 week drive",
      icon: Calendar
    },
    {
      id: "storyteller",
      title: "Storytelling & Community Ambassador",
      desc: "Read storybooks to early childhood groups and lead interactive literacy activities at community micro-libraries.",
      time: "Weekend mornings",
      icon: Heart
    },
    {
      id: "driver",
      title: "Distribution & Delivery Driver",
      desc: "Help transport sorted book crates from our hub directly to partner Title I elementary schools and micro-libraries.",
      time: "Bi-weekly shifts",
      icon: Users
    }
  ];

  return (
    <div id="get-involved-page" className="space-y-16 pb-20">
      
      {/* HEADER HERO */}
      <section className="bg-gradient-to-b from-blue-50 via-slate-50 to-white dark:from-slate-900 dark:via-slate-900 dark:to-slate-950 py-12 lg:py-16 border-b border-slate-200/60 dark:border-slate-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-4">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-blue-100 dark:bg-blue-950 text-blue-700 dark:text-blue-300 text-xs font-semibold">
            <Sparkles className="w-3.5 h-3.5" />
            <span>Join Our Community of Change</span>
          </div>

          <h1 className="text-3xl sm:text-5xl font-extrabold text-slate-900 dark:text-white tracking-tight">
            How You Can <span className="text-blue-600 dark:text-blue-400">Get Involved</span>
          </h1>

          <p className="text-slate-600 dark:text-slate-300 text-base sm:text-lg max-w-2xl mx-auto leading-relaxed">
            Whether you volunteer your time, host a book drive, or sponsor a classroom library, every action helps put inspiring stories into children's hands.
          </p>
        </div>
      </section>

      {/* VOLUNTEER ROLES GRID */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        <div className="text-center max-w-xl mx-auto space-y-2">
          <span className="text-xs font-bold uppercase tracking-wider text-blue-600 dark:text-blue-400">
            Volunteer Opportunities
          </span>
          <h2 className="text-2xl sm:text-3xl font-bold text-slate-900 dark:text-white">
            Find the Role That Fits Your Passion
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {volunteerRoles.map((role) => {
            const Icon = role.icon;
            return (
              <div
                key={role.id}
                className="bg-white dark:bg-slate-800 p-6 rounded-3xl border border-slate-200 dark:border-slate-700 shadow-sm hover:shadow-md transition-all flex flex-col justify-between space-y-4"
              >
                <div className="space-y-3">
                  <div className="w-10 h-10 rounded-2xl bg-blue-50 dark:bg-blue-950 text-blue-600 dark:text-blue-400 flex items-center justify-center font-bold">
                    <Icon className="w-5 h-5" />
                  </div>
                  <h3 className="font-bold text-slate-900 dark:text-white text-base">{role.title}</h3>
                  <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed">{role.desc}</p>
                </div>

                <div className="pt-3 border-t border-slate-100 dark:border-slate-700 flex items-center justify-between text-xs text-slate-500">
                  <span>{role.time}</span>
                  <button
                    onClick={() => {
                      setFormData((prev) => ({ ...prev, role: role.id }));
                      document.getElementById("volunteer-signup-form")?.scrollIntoView({ behavior: "smooth" });
                    }}
                    className="font-bold text-blue-600 dark:text-blue-400 hover:underline"
                  >
                    Select Role →
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      </section>

      {/* HOST A BOOK DRIVE / PARTNER BANNER */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          
          {/* Host a Drive */}
          <div className="bg-gradient-to-br from-slate-900 to-blue-950 text-white p-8 rounded-3xl border border-slate-800 shadow-xl space-y-4 flex flex-col justify-between">
            <div className="space-y-3">
              <span className="text-xs font-bold uppercase tracking-wider text-emerald-400">Toolkit & Guide</span>
              <h3 className="text-2xl font-bold">Host a Book Drive at School or Work</h3>
              <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
                We supply collection box wraps, digital flyer templates, social media graphics, and drop-off shipping labels for free!
              </p>
              <ul className="space-y-2 text-xs text-slate-300 pt-2">
                <li className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                  Complete Starter Kit PDF
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                  Custom Google Form Registration for your drive
                </li>
              </ul>
            </div>

            <div className="pt-4">
              <a
                href="https://forms.google.com"
                target="_blank"
                rel="noopener noreferrer"
                className="bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-bold px-6 py-3 rounded-xl text-xs inline-flex items-center gap-2 shadow-md"
              >
                <FileText className="w-4 h-4" />
                <span>Register Drive on Google Forms</span>
              </a>
            </div>
          </div>

          {/* Corporate / School Partnership */}
          <div className="bg-gradient-to-br from-blue-600 to-indigo-700 text-white p-8 rounded-3xl shadow-xl space-y-4 flex flex-col justify-between">
            <div className="space-y-3">
              <span className="text-xs font-bold uppercase tracking-wider text-blue-200">Institutional Alliances</span>
              <h3 className="text-2xl font-bold">Partner or Sponsor as an Organization</h3>
              <p className="text-xs sm:text-sm text-blue-100 leading-relaxed">
                Companies, rotary clubs, and foundations can sponsor classroom book crates or sponsor micro-library construction.
              </p>
              <ul className="space-y-2 text-xs text-blue-100 pt-2">
                <li className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-white" />
                  Tax-Deductible Corporate Sponsorship Levels
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-white" />
                  Co-branded Book Bins & Classroom Recognition
                </li>
              </ul>
            </div>

            <div className="pt-4">
              <button
                onClick={() => onNavigate("contact")}
                className="bg-white text-blue-900 font-bold px-6 py-3 rounded-xl text-xs hover:bg-blue-50 transition-colors shadow-md"
              >
                Inquire for Corporate Sponsorship
              </button>
            </div>
          </div>

        </div>
      </section>

      {/* VOLUNTEER SIGNUP FORM */}
      <section id="volunteer-signup-form" className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-white dark:bg-slate-800 p-8 sm:p-10 rounded-3xl border border-slate-200 dark:border-slate-700 shadow-xl space-y-6">
          <div className="text-center space-y-2">
            <span className="text-xs font-bold uppercase tracking-wider text-emerald-600 dark:text-emerald-400">
              Sign Up Today
            </span>
            <h2 className="text-2xl sm:text-3xl font-bold text-slate-900 dark:text-white">
              Volunteer Application
            </h2>
            <p className="text-xs text-slate-500">Fill out your details and we will connect you with our regional hub lead.</p>
          </div>

          {status.message && (
            <div
              className={`p-4 rounded-2xl text-xs font-medium ${
                status.type === "success"
                  ? "bg-emerald-50 dark:bg-emerald-950/60 text-emerald-700 dark:text-emerald-300 border border-emerald-300"
                  : "bg-red-50 dark:bg-red-950/60 text-red-700 dark:text-red-300 border border-red-300"
              }`}
            >
              {status.message}
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
                  Full Name *
                </label>
                <input
                  type="text"
                  required
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  placeholder="e.g. Sarah Jenkins"
                  className="w-full bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-xl px-3.5 py-2.5 text-xs text-slate-900 dark:text-white focus:outline-none focus:border-blue-500"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
                  Email Address *
                </label>
                <input
                  type="email"
                  required
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  placeholder="e.g. sarah@example.com"
                  className="w-full bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-xl px-3.5 py-2.5 text-xs text-slate-900 dark:text-white focus:outline-none focus:border-blue-500"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
                  Phone Number *
                </label>
                <input
                  type="tel"
                  required
                  value={formData.phone}
                  onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                  placeholder="e.g. +1 (925) 555-0199"
                  className="w-full bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-xl px-3.5 py-2.5 text-xs text-slate-900 dark:text-white focus:outline-none focus:border-blue-500"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
                  Preferred Role
                </label>
                <select
                  value={formData.role}
                  onChange={(e) => setFormData({ ...formData, role: e.target.value })}
                  className="w-full bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-xl px-3.5 py-2.5 text-xs text-slate-900 dark:text-white focus:outline-none focus:border-blue-500"
                >
                  <option value="book_sorter">Book Sorter & Inspector</option>
                  <option value="drive_host">Host a Book Drive</option>
                  <option value="storyteller">Storyteller / Event Lead</option>
                  <option value="driver">Distribution Driver</option>
                  <option value="general">General Support</option>
                </select>
              </div>
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
                Availability
              </label>
              <input
                type="text"
                value={formData.availability}
                onChange={(e) => setFormData({ ...formData, availability: e.target.value })}
                placeholder="e.g. Saturday Mornings / Weekday Afternoons"
                className="w-full bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-xl px-3.5 py-2.5 text-xs text-slate-900 dark:text-white focus:outline-none focus:border-blue-500"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
                Additional Notes / Questions
              </label>
              <textarea
                rows={3}
                value={formData.notes}
                onChange={(e) => setFormData({ ...formData, notes: e.target.value })}
                placeholder="Tell us a bit about your experience or student group..."
                className="w-full bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-xl px-3.5 py-2.5 text-xs text-slate-900 dark:text-white focus:outline-none focus:border-blue-500"
              />
            </div>

            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full bg-blue-600 hover:bg-blue-500 text-white font-bold py-3 px-6 rounded-xl text-xs transition-all shadow-md flex items-center justify-center gap-2"
            >
              <Send className="w-4 h-4" />
              <span>{isSubmitting ? "Submitting Application..." : "Submit Volunteer Sign-up"}</span>
            </button>
          </form>
        </div>
      </section>

    </div>
  );
};
