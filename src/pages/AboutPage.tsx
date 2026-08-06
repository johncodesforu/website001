import React from "react";
import { BookOpen, Target, Heart, Eye, Award, CheckCircle, ArrowRight, Users, Sparkles } from "lucide-react";

interface AboutPageProps {
  onNavigate: (page: string) => void;
}

export const AboutPage: React.FC<AboutPageProps> = ({ onNavigate }) => {
  const milestones = [
    {
      year: "Phase 1",
      title: "Founding & Nonprofit Incorporation",
      description: "Established 501(c)(3) nonprofit literacy alliance, securing regional collection guidelines and operational frameworks."
    },
    {
      year: "Phase 2",
      title: "Collection Depots & Sorting Protocol",
      description: "Set up drop-off locations across the San Francisco Bay Area with volunteer sorting and book inspection standards."
    },
    {
      year: "Phase 3",
      title: "Title I School & Micro-Library Partnerships",
      description: "Connecting with elementary teachers and community leaders to deploy classroom book grants and outdoor reading boxes."
    },
    {
      year: "Phase 4",
      title: "Inaugural Book Campaign Launch",
      description: "Mobilizing youth drive hosts, neighborhood collection points, and volunteer sorting drivers to distribute free books."
    }
  ];

  const values = [
    {
      title: "Equal Literacy Access",
      desc: "Every child deserves a personal home library regardless of socioeconomic status or geographic location.",
      icon: Target,
      color: "text-blue-500 bg-blue-50 dark:bg-blue-950/50"
    },
    {
      title: "Community Equity",
      desc: "We actively prioritize under-resourced schools and neighborhoods facing severe book desert conditions.",
      icon: Heart,
      color: "text-emerald-500 bg-emerald-50 dark:bg-emerald-950/50"
    },
    {
      title: "Cultural Diversity",
      desc: "Literature should reflect the rich tapestry of our communities, providing mirrors and windows for every young reader.",
      icon: Eye,
      color: "text-purple-500 bg-purple-50 dark:bg-purple-950/50"
    },
    {
      title: "Environmental Sustainability",
      desc: "Reusing gently read books gives stories a second life, keeping thousands of pounds of paper out of landfills.",
      icon: Award,
      color: "text-amber-500 bg-amber-50 dark:bg-amber-950/50"
    }
  ];

  const teamMembers = [
    {
      name: "Dr. Maya Lin",
      role: "Founder & Executive Director",
      bio: "Former elementary reading specialist with 15+ years advocating for youth literacy equity.",
      image: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&q=80&w=400"
    },
    {
      name: "David Chen",
      role: "Director of Community Partnerships",
      bio: "Coordinates relationships with local schools, community hubs, and collection centers.",
      image: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&q=80&w=400"
    },
    {
      name: "Elena Rostova",
      role: "Volunteers & Book Drives Lead",
      bio: "Leads our volunteer book sorters, hub drivers, and high school drive hosts.",
      image: "https://images.unsplash.com/photo-1580489944761-15a19d654956?auto=format&fit=crop&q=80&w=400"
    }
  ];

  return (
    <div id="about-page" className="space-y-16 pb-20">
      
      {/* HEADER HERO */}
      <section className="bg-gradient-to-b from-blue-50 via-slate-50 to-white dark:from-slate-900 dark:via-slate-900 dark:to-slate-950 py-12 lg:py-16 border-b border-slate-200/60 dark:border-slate-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-4">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-blue-100 dark:bg-blue-950 text-blue-700 dark:text-blue-300 text-xs font-semibold">
            <Sparkles className="w-3.5 h-3.5" />
            <span>Our Origin & Purpose</span>
          </div>
          <h1 className="text-3xl sm:text-5xl font-extrabold text-slate-900 dark:text-white tracking-tight">
            Connecting Communities Through the <span className="text-blue-600 dark:text-blue-400">Power of Books</span>
          </h1>
          <p className="text-slate-600 dark:text-slate-300 text-base sm:text-lg max-w-2xl mx-auto leading-relaxed">
            Turning Pages Together bridges the literacy gap by turning gently used books into lifelong opportunities for young minds.
          </p>
        </div>
      </section>

      {/* OUR STORY */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          
          <div className="space-y-6">
            <div className="text-xs font-bold uppercase tracking-wider text-blue-600 dark:text-blue-400">
              Our Story
            </div>
            <h2 className="text-2xl sm:text-4xl font-bold text-slate-900 dark:text-white leading-tight">
              A Dedicated Community Alliance for Youth Literacy
            </h2>
            <div className="space-y-4 text-slate-600 dark:text-slate-300 text-sm leading-relaxed">
              <p>
                Turning Pages Together was founded by Bay Area educators and parents who recognized a stark disparity: while many households have overflowing bookshelves of gently read children's titles, nearby Title I elementary schools and under-resourced neighborhoods face critical book shortages.
              </p>
              <p>
                We established Turning Pages Together to build a seamless bridge between generous donors and young readers who need books most.
              </p>
              <p>
                By creating neighborhood collection hubs, organizing volunteer sorting teams, and partnering with local educators, we ensure every donated book finds a home where it can spark joy, curiosity, and learning.
              </p>
            </div>

            <div className="pt-2 flex items-center gap-4">
              <button
                onClick={() => onNavigate("get-involved")}
                className="bg-blue-600 hover:bg-blue-500 text-white font-semibold px-6 py-3 rounded-xl text-sm transition-all shadow-md flex items-center gap-2"
              >
                <span>Join Our Mission</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </div>

          {/* Visual Showcase Box */}
          <div className="relative rounded-3xl overflow-hidden shadow-2xl border border-slate-200 dark:border-slate-800 bg-slate-900 h-96">
            <img
              src="https://images.unsplash.com/photo-1524995997946-a1c2e315a42f?auto=format&fit=crop&q=80&w=1000"
              alt="Children reading books together"
              className="w-full h-full object-cover opacity-90"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-transparent to-transparent" />
            <div className="absolute bottom-6 left-6 right-6 text-white space-y-1">
              <div className="text-xs font-semibold text-emerald-400 uppercase tracking-wider">Our Commitment</div>
              <p className="font-bold text-base">Dedicated to placing inspiring books directly into children's hands.</p>
            </div>
          </div>

        </div>
      </section>

      {/* CORE VALUES */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-xl mx-auto mb-10 space-y-2">
          <span className="text-xs font-bold uppercase tracking-wider text-emerald-600 dark:text-emerald-400">
            What Drives Us
          </span>
          <h2 className="text-2xl sm:text-3xl font-bold text-slate-900 dark:text-white">
            Mission, Vision & Core Values
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {values.map((v, i) => {
            const Icon = v.icon;
            return (
              <div
                key={i}
                className="p-6 rounded-3xl bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 shadow-sm hover:shadow-md transition-shadow space-y-3"
              >
                <div className={`w-10 h-10 rounded-xl ${v.color} flex items-center justify-center`}>
                  <Icon className="w-5 h-5" />
                </div>
                <h3 className="font-bold text-slate-900 dark:text-white text-base">{v.title}</h3>
                <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed">{v.desc}</p>
              </div>
            );
          })}
        </div>
      </section>

      {/* TIMELINE */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-slate-900 text-white rounded-3xl p-8 sm:p-12 shadow-xl space-y-8 border border-slate-800">
          <div className="text-center max-w-xl mx-auto space-y-2">
            <span className="text-xs font-bold uppercase tracking-wider text-blue-400">Milestone Journey</span>
            <h2 className="text-2xl sm:text-3xl font-bold">Turning Pages Through the Years</h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 relative">
            {milestones.map((m, idx) => (
              <div key={idx} className="bg-slate-800/80 p-6 rounded-2xl border border-slate-700/80 space-y-2 relative">
                <span className="text-2xl font-extrabold text-emerald-400 block">{m.year}</span>
                <h4 className="font-bold text-white text-sm">{m.title}</h4>
                <p className="text-xs text-slate-300 leading-relaxed">{m.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* LEADERSHIP & TEAM */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-xl mx-auto mb-10 space-y-2">
          <span className="text-xs font-bold uppercase tracking-wider text-blue-600 dark:text-blue-400">
            Dedicated Leadership
          </span>
          <h2 className="text-2xl sm:text-3xl font-bold text-slate-900 dark:text-white">
            Meet Our Passionate Team
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {teamMembers.map((member, idx) => (
            <div
              key={idx}
              className="bg-white dark:bg-slate-800 rounded-3xl overflow-hidden border border-slate-200 dark:border-slate-700 shadow-sm p-6 space-y-4 text-center"
            >
              <div className="w-24 h-24 mx-auto rounded-full overflow-hidden shadow-lg border-2 border-blue-500">
                <img src={member.image} alt={member.name} className="w-full h-full object-cover" />
              </div>
              <div>
                <h3 className="font-bold text-slate-900 dark:text-white text-base">{member.name}</h3>
                <div className="text-xs font-semibold text-blue-600 dark:text-blue-400">{member.role}</div>
              </div>
              <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed">{member.bio}</p>
            </div>
          ))}
        </div>
      </section>

    </div>
  );
};
