import React, { useState } from "react";
import { MapPin, Navigation, Phone, Mail, Clock, ExternalLink, Copy, Check } from "lucide-react";

export const MapComponent: React.FC = () => {
  const [copied, setCopied] = useState(false);

  const address = "1250 Main Street, Walnut Creek, CA 94596";
  const mapsUrl = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent("Walnut Creek CA")}`;

  const handleCopy = () => {
    navigator.clipboard.writeText(address);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div id="interactive-google-map-card" className="relative rounded-3xl overflow-hidden shadow-xl border border-slate-200 dark:border-slate-800 bg-slate-900 group">
      {/* Visual Stylized Map Graphic Layer */}
      <div className="h-96 w-full relative bg-slate-950 overflow-hidden">
        {/* Map Grid Pattern */}
        <div
          className="absolute inset-0 opacity-20"
          style={{
            backgroundImage: `radial-gradient(#3b82f6 1px, transparent 1px), linear-gradient(to right, #1e293b 1px, transparent 1px), linear-gradient(to bottom, #1e293b 1px, transparent 1px)`,
            backgroundSize: `24px 24px, 48px 48px, 48px 48px`
          }}
        />

        {/* Decorative Roads / Rivers Vectors */}
        <svg className="absolute inset-0 w-full h-full opacity-30 pointer-events-none" xmlns="http://www.w3.org/2000/svg">
          <path d="M-100 120 C 150 200, 300 50, 600 280 C 800 400, 1000 100, 1200 300" stroke="#3b82f6" strokeWidth="8" fill="none" />
          <path d="M100 400 C 350 200, 500 350, 800 100 C 950 0, 1100 150, 1300 50" stroke="#22c55e" strokeWidth="4" strokeDasharray="6 6" fill="none" />
          <path d="M 300 -50 Q 400 200 700 450" stroke="#64748b" strokeWidth="12" fill="none" />
        </svg>

        {/* Map Pin Marker */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 flex flex-col items-center z-10 animate-bounce duration-1000">
          <div className="bg-gradient-to-r from-blue-600 to-emerald-500 text-white p-3 rounded-2xl shadow-2xl shadow-blue-500/50 flex items-center justify-center border-2 border-white">
            <MapPin className="w-6 h-6 fill-white/20" />
          </div>
          <div className="w-3 h-3 bg-blue-500 rounded-full blur-xs mt-1 animate-ping" />
        </div>

        {/* Top Info Badge */}
        <div className="absolute top-4 left-4 z-20 bg-slate-900/80 backdrop-blur-md text-white text-xs px-3.5 py-1.5 rounded-full border border-slate-700/80 flex items-center gap-2 shadow-lg">
          <div className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
          <span className="font-medium">Primary Book Drop-Off Hub</span>
        </div>

        {/* Floating Interactive Location Card */}
        <div className="absolute bottom-4 left-4 right-4 z-20 bg-white/95 dark:bg-slate-900/95 backdrop-blur-md p-4 sm:p-5 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-xl space-y-3">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
            <div>
              <h4 className="font-bold text-slate-900 dark:text-white text-base sm:text-lg flex items-center gap-2">
                <span>Turning Pages Together Hub</span>
                <span className="text-xs font-normal text-emerald-600 dark:text-emerald-400 bg-emerald-50 dark:bg-emerald-950/60 px-2 py-0.5 rounded-full border border-emerald-200 dark:border-emerald-800">
                  Open Today
                </span>
              </h4>
              <p className="text-xs text-slate-600 dark:text-slate-300 flex items-center gap-1.5 mt-0.5">
                <span>{address}</span>
              </p>
            </div>

            <div className="flex items-center gap-2 shrink-0">
              <button
                onClick={handleCopy}
                className="p-2 rounded-xl bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-200 text-xs font-medium flex items-center gap-1 transition-colors"
                title="Copy address"
              >
                {copied ? <Check className="w-4 h-4 text-emerald-500" /> : <Copy className="w-4 h-4" />}
                <span className="hidden sm:inline">{copied ? "Copied" : "Copy"}</span>
              </button>

              <a
                href={mapsUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="bg-blue-600 hover:bg-blue-500 text-white text-xs font-semibold px-3.5 py-2 rounded-xl flex items-center gap-1.5 shadow-md shadow-blue-600/20 transition-all"
              >
                <Navigation className="w-3.5 h-3.5" />
                <span>Open Google Maps</span>
                <ExternalLink className="w-3 h-3" />
              </a>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-2 pt-2 border-t border-slate-200 dark:border-slate-800 text-xs text-slate-600 dark:text-slate-300">
            <div className="flex items-center gap-2">
              <Clock className="w-3.5 h-3.5 text-blue-500 shrink-0" />
              <span>Mon - Sat: 9:00 AM - 6:00 PM</span>
            </div>
            <div className="flex items-center gap-2">
              <Phone className="w-3.5 h-3.5 text-emerald-500 shrink-0" />
              <a href="tel:+19255778603" className="hover:underline">+1 (925) 577-8603</a>
            </div>
            <div className="flex items-center gap-2">
              <Mail className="w-3.5 h-3.5 text-amber-500 shrink-0" />
              <a href="mailto:turningpagestogetherofficial@gmail.com" className="hover:underline truncate">
                Email Us Direct
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
