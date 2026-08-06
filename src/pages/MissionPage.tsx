import React, { useState } from "react";
import { BookOpen, AlertTriangle, School, Heart, Sparkles, Check, ArrowRight, BarChart3, Globe } from "lucide-react";

interface MissionPageProps {
  onNavigate: (page: string) => void;
}

export const MissionPage: React.FC<MissionPageProps> = ({ onNavigate }) => {
  const [selectedPillar, setSelectedPillar] = useState(0);

  const pillars = [
    {
      title: "Classroom Library Grants",
      desc: "Providing Title I elementary classrooms with curated 50-book reading corners featuring diverse, age-appropriate titles.",
      impact: "Classroom Program",
      detail: "Teachers in under-funded schools often spend hundreds of dollars out-of-pocket on books. Our grant kits ensure every classroom has a vibrant, accessible library."
    },
    {
      title: "Neighborhood Micro-Libraries",
      desc: "Installing weather-proof 24/7 wooden book boxes in park plazas and community centers in low-income housing zones.",
      impact: "Community Access",
      detail: "Micro-libraries operate on 'Take a book, share a book'. Volunteer stewards restock them weekly with early readers, YA fiction, and bilingual titles."
    },
    {
      title: "Family Literacy Backpack Kits",
      desc: "Packing personalized book bundles for early childhood learners and kindergarteners to encourage family reading at home.",
      impact: "Early Literacy Focus",
      detail: "Early literacy begins at home. Each backpack contains 4 age-appropriate storybooks, a bookmark, and reading activity guides for parents."
    },
    {
      title: "Youth Ambassador Book Drives",
      desc: "Empowering middle and high school students to host book collection drives in their local neighborhoods and clubs.",
      impact: "Youth Leadership",
      detail: "We equip youth organizers with collection bins, promotional flyers, and shipping boxes to run successful 1-week drives."
    }
  ];

  return (
    <div id="mission-page" className="space-y-16 pb-20">
      
      {/* HEADER */}
      <section className="bg-gradient-to-b from-emerald-50 via-slate-50 to-white dark:from-slate-900 dark:via-slate-900 dark:to-slate-950 py-12 lg:py-16 border-b border-slate-200/60 dark:border-slate-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-4">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-emerald-100 dark:bg-emerald-950 text-emerald-700 dark:text-emerald-300 text-xs font-semibold">
            <Globe className="w-3.5 h-3.5" />
            <span>Understanding the Literacy Challenge</span>
          </div>
          <h1 className="text-3xl sm:text-5xl font-extrabold text-slate-900 dark:text-white tracking-tight">
            Our Mission: Eliminating <span className="text-emerald-600 dark:text-emerald-400">Book Deserts</span>
          </h1>
          <p className="text-slate-600 dark:text-slate-300 text-base sm:text-lg max-w-2xl mx-auto leading-relaxed">
            We believe that every child deserves access to inspiring stories regardless of their family's income or neighborhood.
          </p>
        </div>
      </section>

      {/* LITERACY CRISIS STATS */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-slate-900 text-white rounded-3xl p-8 sm:p-12 shadow-2xl border border-slate-800 space-y-8">
          <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-6 pb-6 border-b border-slate-800">
            <div className="space-y-2">
              <span className="text-xs font-bold uppercase text-amber-400 flex items-center gap-1.5">
                <AlertTriangle className="w-4 h-4" />
                The Reality of Book Deserts
              </span>
              <h2 className="text-2xl sm:text-3xl font-bold">Why Free Book Distribution Matters</h2>
            </div>
            <button
              onClick={() => onNavigate("donate-books")}
              className="bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-bold px-5 py-2.5 rounded-xl text-xs transition-colors shrink-0"
            >
              Help Fill the Gap
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="space-y-2 p-6 rounded-2xl bg-slate-800/60 border border-slate-700">
              <div className="text-4xl font-extrabold text-amber-400">1 : 300</div>
              <p className="text-xs text-slate-300 leading-relaxed">
                In low-income neighborhoods, there is on average only <strong>1 book for every 300 children</strong>, compared to 13 books per child in affluent neighborhoods.
              </p>
            </div>

            <div className="space-y-2 p-6 rounded-2xl bg-slate-800/60 border border-slate-700">
              <div className="text-4xl font-extrabold text-blue-400">61%</div>
              <p className="text-xs text-slate-300 leading-relaxed">
                Over <strong>61% of low-income families</strong> do not own a single age-appropriate children's book in their home.
              </p>
            </div>

            <div className="space-y-2 p-6 rounded-2xl bg-slate-800/60 border border-slate-700">
              <div className="text-4xl font-extrabold text-emerald-400">3x</div>
              <p className="text-xs text-slate-300 leading-relaxed">
                Children who own books are <strong>3 times more likely</strong> to achieve proficient 3rd-grade reading levels, predicting lifelong academic success.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* THE 4 PROGRAM PILLARS */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        <div className="text-center max-w-xl mx-auto space-y-2">
          <span className="text-xs font-bold uppercase tracking-wider text-emerald-600 dark:text-emerald-400">
            Our Strategic Model
          </span>
          <h2 className="text-2xl sm:text-3xl font-bold text-slate-900 dark:text-white">
            The Four Pillars of Turning Pages Together
          </h2>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* Pillar Selector Buttons */}
          <div className="lg:col-span-5 space-y-3">
            {pillars.map((p, idx) => (
              <button
                key={idx}
                onClick={() => setSelectedPillar(idx)}
                className={`w-full text-left p-5 rounded-2xl border transition-all duration-200 flex items-center justify-between ${
                  selectedPillar === idx
                    ? "bg-blue-600 text-white border-blue-600 shadow-lg"
                    : "bg-white dark:bg-slate-800 text-slate-800 dark:text-slate-200 border-slate-200 dark:border-slate-700 hover:bg-slate-50 dark:hover:bg-slate-700"
                }`}
              >
                <div>
                  <div className="font-bold text-base">{p.title}</div>
                  <div className={`text-xs mt-0.5 ${selectedPillar === idx ? "text-blue-100" : "text-slate-500"}`}>
                    {p.impact}
                  </div>
                </div>
                <ArrowRight className={`w-5 h-5 shrink-0 ${selectedPillar === idx ? "text-white" : "text-slate-400"}`} />
              </button>
            ))}
          </div>

          {/* Pillar Detail Showcase Card */}
          <div className="lg:col-span-7 bg-white dark:bg-slate-800 p-8 sm:p-10 rounded-3xl border border-slate-200 dark:border-slate-700 shadow-md space-y-6">
            <div className="inline-block px-3 py-1 rounded-full bg-emerald-100 dark:bg-emerald-950 text-emerald-700 dark:text-emerald-300 text-xs font-bold">
              Pillar #{selectedPillar + 1}: {pillars[selectedPillar].impact}
            </div>

            <h3 className="text-2xl font-bold text-slate-900 dark:text-white">
              {pillars[selectedPillar].title}
            </h3>

            <p className="text-base text-slate-700 dark:text-slate-200 leading-relaxed font-medium">
              {pillars[selectedPillar].desc}
            </p>

            <div className="p-4 rounded-2xl bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 text-xs text-slate-600 dark:text-slate-300 leading-relaxed space-y-2">
              <div className="font-bold text-slate-900 dark:text-white flex items-center gap-1.5">
                <Check className="w-4 h-4 text-emerald-500" />
                <span>Program Details:</span>
              </div>
              <p>{pillars[selectedPillar].detail}</p>
            </div>

            <div className="pt-2 flex items-center gap-3">
              <button
                onClick={() => onNavigate("get-involved")}
                className="bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-bold px-5 py-3 rounded-xl shadow-md transition-all flex items-center gap-2"
              >
                <span>Support This Program</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </div>

        </div>
      </section>

      {/* CALL TO ACTION */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-gradient-to-r from-emerald-600 to-teal-600 text-white p-8 sm:p-10 rounded-3xl shadow-xl flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="space-y-1 text-center md:text-left">
            <h3 className="text-xl sm:text-2xl font-bold">Are you an Educator or School Administrator?</h3>
            <p className="text-emerald-100 text-xs sm:text-sm">
              Apply to receive free book grant crates for your classroom or school reading room!
            </p>
          </div>
          <button
            onClick={() => onNavigate("contact")}
            className="bg-slate-950 text-white font-bold px-6 py-3 rounded-xl text-xs shadow-md shrink-0 hover:bg-slate-900"
          >
            Apply for Book Grant
          </button>
        </div>
      </section>

    </div>
  );
};
