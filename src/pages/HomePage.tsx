import React, { useState } from "react";
import { BookOpen, Heart, Users, School, Building2, Sparkles, ArrowRight, CheckCircle2, Star, Calendar, Quote, ChevronRight } from "lucide-react";
import { BlogPost } from "../types";

interface HomePageProps {
  posts: BlogPost[];
  onNavigate: (page: string) => void;
  onSelectPost: (post: BlogPost) => void;
}

export const HomePage: React.FC<HomePageProps> = ({ posts, onNavigate, onSelectPost }) => {
  const [calculatorBooks, setCalculatorBooks] = useState(25);

  const commitments = [
    { label: "Direct Book Distribution", value: "100% Free", desc: "For children, schools & community shelves", icon: BookOpen, color: "from-blue-600 to-indigo-600" },
    { label: "Regional Collection Hubs", value: "Bay Area", desc: "Accessible drop-off bins & depot points", icon: Building2, color: "from-emerald-600 to-teal-600" },
    { label: "Target Outreach", value: "Title I Schools", desc: "Enriching classroom reading corners", icon: School, color: "from-amber-500 to-orange-600" },
    { label: "Community Powered", value: "Youth Led", desc: "Student book drives & volunteer stewards", icon: Users, color: "from-purple-600 to-pink-600" },
  ];

  const testimonials = [
    {
      quote: "Access to diverse storybooks in elementary classrooms builds early reading confidence and opens up whole new worlds for young learners.",
      author: "Patricia Vance",
      role: "Elementary Reading Specialist",
      school: "Oakland Unified School District"
    },
    {
      quote: "Hosting a book drive empowers students to take active leadership in their own communities while learning the power of grassroots literacy action.",
      author: "Julian Thorne",
      role: "Youth Ambassador & Drive Organizer",
      school: "Walnut Creek High"
    },
    {
      quote: "Creating accessible neighborhood book boxes ensures every child can discover stories within walking distance of their front door.",
      author: "Maria Santos",
      role: "Community Parent & Advocate",
      school: "East Bay Neighborhood Alliance"
    }
  ];

  return (
    <div id="home-page-container" className="space-y-20 pb-20">
      
      {/* HERO SECTION */}
      <section className="relative pt-12 lg:pt-20 pb-16 overflow-hidden">
        {/* Soft Modern Radial Gradients */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-7xl h-96 bg-gradient-to-tr from-blue-500/10 via-emerald-500/10 to-purple-500/10 blur-3xl rounded-full pointer-events-none" />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="text-center max-w-3xl mx-auto space-y-6">
            
            {/* Top Eyebrow Badge */}
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-blue-50 dark:bg-blue-950/60 border border-blue-200 dark:border-blue-800 text-blue-700 dark:text-blue-300 text-xs font-semibold shadow-xs animate-in fade-in slide-in-from-bottom-2 duration-300">
              <Sparkles className="w-3.5 h-3.5 text-blue-600 dark:text-blue-400" />
              <span>Turning Pages Together • 501(c)(3) Literacy Alliance</span>
            </div>

            {/* Headline */}
            <h1 className="text-4xl sm:text-6xl lg:text-7xl font-extrabold tracking-tight text-slate-900 dark:text-white leading-[1.1]">
              Every Book Opens a <span className="bg-gradient-to-r from-blue-600 via-indigo-600 to-emerald-500 bg-clip-text text-transparent">New World.</span>
            </h1>

            {/* Subtitle */}
            <p className="text-lg sm:text-xl text-slate-600 dark:text-slate-300 leading-relaxed font-normal">
              Turning Pages Together is dedicated to improving youth literacy by collecting and distributing free books to children, families, schools, and underserved communities.
            </p>

            {/* Hero Action Buttons */}
            <div className="pt-4 flex flex-col sm:flex-row items-center justify-center gap-4">
              <button
                onClick={() => onNavigate("donate-books")}
                className="w-full sm:w-auto bg-emerald-600 hover:bg-emerald-500 text-white font-semibold text-base px-8 py-4 rounded-2xl shadow-xl shadow-emerald-600/25 hover:shadow-emerald-600/35 transition-all flex items-center justify-center gap-2.5 group"
              >
                <Heart className="w-5 h-5 fill-white/20 group-hover:scale-110 transition-transform" />
                <span>Donate Books</span>
              </button>

              <button
                onClick={() => onNavigate("get-involved")}
                className="w-full sm:w-auto bg-white dark:bg-slate-800 hover:bg-slate-50 dark:hover:bg-slate-700 text-slate-800 dark:text-white border border-slate-200 dark:border-slate-700 font-semibold text-base px-8 py-4 rounded-2xl shadow-sm transition-all flex items-center justify-center gap-2 group"
              >
                <span>Get Involved</span>
                <ArrowRight className="w-4 h-4 text-slate-400 group-hover:translate-x-1 transition-transform" />
              </button>
            </div>

            {/* Trust Badges */}
            <div className="pt-6 flex flex-wrap items-center justify-center gap-6 text-xs text-slate-500 dark:text-slate-400">
              <span className="flex items-center gap-1.5">
                <CheckCircle2 className="w-4 h-4 text-emerald-500" />
                100% Direct Distribution
              </span>
              <span className="flex items-center gap-1.5">
                <CheckCircle2 className="w-4 h-4 text-blue-500" />
                San Francisco Bay Area Collection Hubs
              </span>
              <span className="flex items-center gap-1.5">
                <CheckCircle2 className="w-4 h-4 text-indigo-500" />
                Tax-Deductible Nonprofit
              </span>
            </div>

          </div>
        </div>
      </section>

      {/* CORE ORGANIZATIONAL COMMITMENTS */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
          {commitments.map((item, i) => {
            const Icon = item.icon;
            return (
              <div
                key={i}
                className="p-6 rounded-3xl bg-white dark:bg-slate-800/80 border border-slate-200/80 dark:border-slate-700/80 shadow-md hover:shadow-xl transition-all duration-300 relative overflow-hidden group space-y-2"
              >
                <div className={`w-12 h-12 rounded-2xl bg-gradient-to-tr ${item.color} text-white flex items-center justify-center shadow-lg mb-3 group-hover:scale-110 transition-transform`}>
                  <Icon className="w-6 h-6" />
                </div>
                <div className="text-2xl font-extrabold text-slate-900 dark:text-white tracking-tight">
                  {item.value}
                </div>
                <div className="text-xs font-bold uppercase tracking-wider text-blue-600 dark:text-blue-400">
                  {item.label}
                </div>
                <div className="text-xs text-slate-500 dark:text-slate-400 leading-relaxed">
                  {item.desc}
                </div>
              </div>
            );
          })}
        </div>
      </section>

      {/* INTERACTIVE IMPACT CALCULATOR */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-gradient-to-br from-slate-900 via-blue-950 to-slate-900 text-white rounded-3xl p-8 sm:p-12 shadow-2xl relative overflow-hidden border border-slate-800">
          
          <div className="max-w-2xl space-y-4">
            <span className="text-xs font-bold uppercase tracking-wider text-emerald-400">
              Interactive Impact Calculator
            </span>
            <h2 className="text-2xl sm:text-4xl font-bold tracking-tight">
              Pledge Your Book Donation Impact
            </h2>
            <p className="text-slate-300 text-sm leading-relaxed">
              Drag the slider to calculate how your book contribution will empower young readers and classrooms:
            </p>

            {/* Slider Controls */}
            <div className="pt-4 space-y-3">
              <div className="flex items-center justify-between text-sm font-semibold text-emerald-400">
                <span>Selected Donation:</span>
                <span className="text-2xl font-bold text-white">{calculatorBooks} Books</span>
              </div>
              <input
                type="range"
                min="5"
                max="200"
                step="5"
                value={calculatorBooks}
                onChange={(e) => setCalculatorBooks(Number(e.target.value))}
                className="w-full h-3 bg-slate-800 rounded-lg appearance-none cursor-pointer accent-emerald-500"
              />
              <div className="flex justify-between text-xs text-slate-400">
                <span>5 Books (Single Bag)</span>
                <span>50 Books (Box Drive)</span>
                <span>200 Books (Full Library Restock)</span>
              </div>
            </div>

            {/* Dynamic Calculated Outcomes */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-6">
              <div className="p-4 rounded-2xl bg-white/10 backdrop-blur-md border border-white/10">
                <div className="text-2xl font-bold text-emerald-400">{Math.round(calculatorBooks * 0.8)} Children</div>
                <div className="text-xs text-slate-300 mt-0.5">Provided with personal take-home books</div>
              </div>

              <div className="p-4 rounded-2xl bg-white/10 backdrop-blur-md border border-white/10">
                <div className="text-2xl font-bold text-blue-400">{Math.max(1, Math.round(calculatorBooks / 25))} Classrooms</div>
                <div className="text-xs text-slate-300 mt-0.5">Enriched with reading corners</div>
              </div>

              <div className="p-4 rounded-2xl bg-white/10 backdrop-blur-md border border-white/10">
                <div className="text-2xl font-bold text-amber-400">{calculatorBooks * 15} Hours</div>
                <div className="text-xs text-slate-300 mt-0.5">Of inspired childhood reading time</div>
              </div>
            </div>

            <div className="pt-4">
              <button
                onClick={() => onNavigate("donate-books")}
                className="bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-bold px-6 py-3 rounded-xl text-sm transition-all shadow-lg flex items-center gap-2"
              >
                <span>Pledge {calculatorBooks} Books Now</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* RECENT BLOG / UPDATES SECTION */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4">
          <div>
            <div className="text-xs font-bold uppercase tracking-wider text-blue-600 dark:text-blue-400">
              Latest Updates
            </div>
            <h2 className="text-2xl sm:text-3xl font-bold text-slate-900 dark:text-white tracking-tight mt-1">
              Stories from the Community
            </h2>
          </div>

          <button
            onClick={() => onNavigate("blog")}
            className="text-sm font-semibold text-blue-600 dark:text-blue-400 hover:underline flex items-center gap-1 self-start sm:self-auto"
          >
            <span>View All News & Blog Posts</span>
            <ChevronRight className="w-4 h-4" />
          </button>
        </div>

        {/* Blog Post Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {posts.slice(0, 3).map((post) => (
            <article
              key={post.id}
              onClick={() => onSelectPost(post)}
              className="bg-white dark:bg-slate-800 rounded-3xl overflow-hidden border border-slate-200 dark:border-slate-700 shadow-sm hover:shadow-xl transition-all duration-300 flex flex-col cursor-pointer group"
            >
              <div className="h-48 w-full relative overflow-hidden bg-slate-900">
                <img
                  src={post.coverImage}
                  alt={post.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute top-3 left-3">
                  <span className="bg-slate-900/80 backdrop-blur-md text-white text-[11px] font-semibold px-2.5 py-1 rounded-full border border-white/20">
                    {post.category}
                  </span>
                </div>
              </div>

              <div className="p-6 flex-1 flex flex-col justify-between space-y-4">
                <div className="space-y-2">
                  <div className="flex items-center gap-2 text-xs text-slate-500 dark:text-slate-400">
                    <Calendar className="w-3.5 h-3.5" />
                    <span>{new Date(post.publishedAt).toLocaleDateString()}</span>
                    <span>•</span>
                    <span>{post.author}</span>
                  </div>

                  <h3 className="font-bold text-slate-900 dark:text-white text-base group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors line-clamp-2">
                    {post.title}
                  </h3>

                  <p className="text-slate-600 dark:text-slate-300 text-xs leading-relaxed line-clamp-3">
                    {post.summary}
                  </p>
                </div>

                <div className="pt-2 flex items-center justify-between text-xs font-semibold text-blue-600 dark:text-blue-400">
                  <span>Read Full Story</span>
                  <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </div>
              </div>
            </article>
          ))}
        </div>
      </section>

      {/* TESTIMONIALS */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-slate-100/80 dark:bg-slate-800/50 rounded-3xl p-8 sm:p-12 border border-slate-200 dark:border-slate-700 space-y-8">
          <div className="text-center max-w-xl mx-auto space-y-2">
            <span className="text-xs font-bold uppercase tracking-wider text-emerald-600 dark:text-emerald-400">
              Voices of Impact
            </span>
            <h2 className="text-2xl sm:text-3xl font-bold text-slate-900 dark:text-white">
              Trusted by Educators, Students & Parents
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {testimonials.map((t, idx) => (
              <div
                key={idx}
                className="bg-white dark:bg-slate-900 p-6 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-sm space-y-4 flex flex-col justify-between"
              >
                <div className="space-y-3">
                  <Quote className="w-8 h-8 text-blue-500/30" />
                  <p className="text-xs sm:text-sm text-slate-700 dark:text-slate-300 leading-relaxed italic">
                    "{t.quote}"
                  </p>
                </div>

                <div className="pt-4 border-t border-slate-100 dark:border-slate-800">
                  <div className="font-bold text-xs text-slate-900 dark:text-white">{t.author}</div>
                  <div className="text-[11px] text-slate-500">{t.role}</div>
                  <div className="text-[11px] text-blue-600 dark:text-blue-400">{t.school}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* BOTTOM CTA BANNER */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-gradient-to-r from-blue-600 via-indigo-600 to-emerald-600 text-white rounded-3xl p-8 sm:p-12 shadow-xl flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="space-y-2 text-center md:text-left">
            <h2 className="text-2xl sm:text-3xl font-bold">Ready to Share the Joy of Reading?</h2>
            <p className="text-blue-100 text-sm max-w-lg">
              Whether you have 5 books or 5,000 books, your contribution helps build vibrant classroom libraries and community book shelves.
            </p>
          </div>

          <div className="flex items-center gap-3 shrink-0">
            <button
              onClick={() => onNavigate("donate-books")}
              className="bg-white text-slate-900 hover:bg-slate-100 font-bold px-6 py-3.5 rounded-xl text-sm transition-all shadow-md"
            >
              Donate Books Now
            </button>
            <button
              onClick={() => onNavigate("contact")}
              className="bg-blue-700/80 hover:bg-blue-700 text-white font-semibold px-5 py-3.5 rounded-xl text-sm transition-all border border-white/20"
            >
              Contact Us
            </button>
          </div>
        </div>
      </section>

    </div>
  );
};
