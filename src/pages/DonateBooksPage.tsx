import React, { useState } from "react";
import { Heart, CheckCircle2, XCircle, MapPin, Phone, Package, Send, HelpCircle, ChevronDown, ChevronUp, Sparkles, AlertCircle } from "lucide-react";
import { submitDonationRequest } from "../lib/api";

interface DonateBooksPageProps {
  onNavigate: (page: string) => void;
}

export const DonateBooksPage: React.FC<DonateBooksPageProps> = ({ onNavigate }) => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    bookCount: 25,
    condition: "gently_used",
    preferredOption: "drop_off",
    address: "",
    notes: ""
  });
  const [status, setStatus] = useState<{ type: "success" | "error" | null; message: string }>({ type: null, message: "" });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [activeFaq, setActiveFaq] = useState<number | null>(0);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setStatus({ type: null, message: "" });

    try {
      const res = await submitDonationRequest(formData);
      setStatus({ type: "success", message: res.message || "Thank you! Your donation request has been recorded. We will contact you with drop-off or pickup details!" });
      setFormData({
        name: "",
        email: "",
        phone: "",
        bookCount: 25,
        condition: "gently_used",
        preferredOption: "drop_off",
        address: "",
        notes: ""
      });
    } catch (err: any) {
      setStatus({ type: "error", message: err.message || "Failed to submit donation request. Please try again." });
    } finally {
      setIsSubmitting(false);
    }
  };

  const dropOffHubs = [
    {
      name: "Walnut Creek Primary Hub",
      address: "1250 Main Street, Walnut Creek, CA 94596",
      hours: "Mon - Sat: 9:00 AM - 6:00 PM",
      phone: "+1 (925) 577-8603"
    },
    {
      name: "Oakland Community Collection Center",
      address: "420 14th Street, Oakland, CA 94612",
      hours: "Tue - Sun: 10:00 AM - 5:00 PM",
      phone: "+1 (925) 577-8603"
    },
    {
      name: "San Jose Youth Literacy Depot",
      address: "88 S 3rd St, San Jose, CA 95113",
      hours: "Wed - Mon: 9:00 AM - 5:00 PM",
      phone: "+1 (925) 577-8603"
    }
  ];

  const faqs = [
    {
      q: "What types of books do you accept?",
      a: "We accept new and gently used books for children and young adults (ages 0-18). This includes board books, picture storybooks, early chapter books, middle-grade fiction, YA literature, graphic novels, and children's dictionaries/encyclopedias."
    },
    {
      q: "What conditions are NOT accepted?",
      a: "We cannot accept books with heavy mold, water damage, missing/torn pages, heavy highlighting, or adult textbooks/magazines. Please ensure books are clean and ready to bring joy to a child."
    },
    {
      q: "Do you offer home or office pickups?",
      a: "Yes! For large book donations of 50+ books or community book drive collections, our volunteer drivers offer pickup services within the San Francisco Bay Area."
    },
    {
      q: "Is my book donation tax-deductible?",
      a: "Yes. Turning Pages Together is a registered 501(c)(3) nonprofit organization. Upon dropping off or scheduling a pickup, we will issue a tax-deductible donation receipt for your records."
    }
  ];

  return (
    <div id="donate-books-page" className="space-y-16 pb-20">
      
      {/* HEADER HERO */}
      <section className="bg-gradient-to-b from-emerald-50 via-slate-50 to-white dark:from-slate-900 dark:via-slate-900 dark:to-slate-950 py-12 lg:py-16 border-b border-slate-200/60 dark:border-slate-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-4">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-emerald-100 dark:bg-emerald-950 text-emerald-700 dark:text-emerald-300 text-xs font-semibold">
            <Sparkles className="w-3.5 h-3.5" />
            <span>Donate Books • Change Lives</span>
          </div>

          <h1 className="text-3xl sm:text-5xl font-extrabold text-slate-900 dark:text-white tracking-tight">
            How Book <span className="text-emerald-600 dark:text-emerald-400">Donations Work</span>
          </h1>

          <p className="text-slate-600 dark:text-slate-300 text-base sm:text-lg max-w-2xl mx-auto leading-relaxed">
            Give your gently read books a second life. We make it easy to drop off books or request a bulk pickup for school drives.
          </p>
        </div>
      </section>

      {/* 3-STEP DONATION PROCESS */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-white dark:bg-slate-800 p-6 rounded-3xl border border-slate-200 dark:border-slate-700 shadow-sm space-y-3">
            <div className="w-10 h-10 rounded-2xl bg-emerald-100 dark:bg-emerald-950 text-emerald-600 dark:text-emerald-400 font-bold flex items-center justify-center">
              1
            </div>
            <h3 className="font-bold text-slate-900 dark:text-white text-base">Check Book Conditions</h3>
            <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed">
              Ensure books are clean, intact, and free of mold or missing pages. We accept Pre-K through High School reading levels.
            </p>
          </div>

          <div className="bg-white dark:bg-slate-800 p-6 rounded-3xl border border-slate-200 dark:border-slate-700 shadow-sm space-y-3">
            <div className="w-10 h-10 rounded-2xl bg-blue-100 dark:bg-blue-950 text-blue-600 dark:text-blue-400 font-bold flex items-center justify-center">
              2
            </div>
            <h3 className="font-bold text-slate-900 dark:text-white text-base">Box or Bag Your Books</h3>
            <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed">
              Pack books securely in sturdy cardboard boxes or reusable bags to protect cover bindings during transit.
            </p>
          </div>

          <div className="bg-white dark:bg-slate-800 p-6 rounded-3xl border border-slate-200 dark:border-slate-700 shadow-sm space-y-3">
            <div className="w-10 h-10 rounded-2xl bg-purple-100 dark:bg-purple-950 text-purple-600 dark:text-purple-400 font-bold flex items-center justify-center">
              3
            </div>
            <h3 className="font-bold text-slate-900 dark:text-white text-base">Drop Off or Request Pickup</h3>
            <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed">
              Bring your boxes to any of our regional drop-off bins or schedule a pickup for donations over 25 books below.
            </p>
          </div>
        </div>
      </section>

      {/* ACCEPTED VS UNACCEPTED GUIDELINE */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-slate-900 text-white p-8 sm:p-10 rounded-3xl border border-slate-800 shadow-xl space-y-6">
          <div className="text-center max-w-xl mx-auto space-y-2">
            <span className="text-xs font-bold uppercase tracking-wider text-emerald-400">Quality Standard</span>
            <h2 className="text-2xl sm:text-3xl font-bold">Book Condition Guidelines</h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            
            {/* Accepted */}
            <div className="bg-slate-800/80 p-6 rounded-2xl border border-emerald-500/30 space-y-3">
              <h4 className="font-bold text-emerald-400 text-base flex items-center gap-2">
                <CheckCircle2 className="w-5 h-5 text-emerald-400" />
                <span>We Enthusiastically Accept:</span>
              </h4>
              <ul className="space-y-2 text-xs text-slate-300">
                <li className="flex items-start gap-2">
                  <span className="text-emerald-400 font-bold">•</span>
                  Children's picture books & sturdy board books
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-emerald-400 font-bold">•</span>
                  Early readers, chapter books & middle grade fiction
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-emerald-400 font-bold">•</span>
                  Young adult literature & graphic novels
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-emerald-400 font-bold">•</span>
                  Bilingual & non-English children's storybooks
                </li>
              </ul>
            </div>

            {/* Unaccepted */}
            <div className="bg-slate-800/80 p-6 rounded-2xl border border-red-500/30 space-y-3">
              <h4 className="font-bold text-red-400 text-base flex items-center gap-2">
                <XCircle className="w-5 h-5 text-red-400" />
                <span>We Cannot Accept:</span>
              </h4>
              <ul className="space-y-2 text-xs text-slate-300">
                <li className="flex items-start gap-2">
                  <span className="text-red-400 font-bold">•</span>
                  Books with water damage, mold, or heavy odor
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-red-400 font-bold">•</span>
                  Books missing covers or pages
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-red-400 font-bold">•</span>
                  College textbooks, adult romance novels, or old encyclopedias
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-red-400 font-bold">•</span>
                  Activity workbooks with written answers inside
                </li>
              </ul>
            </div>

          </div>
        </div>
      </section>

      {/* DROP-OFF HUBS LIST */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        <div className="text-center max-w-xl mx-auto space-y-2">
          <span className="text-xs font-bold uppercase tracking-wider text-blue-600 dark:text-blue-400">
            Regional Collection Depots
          </span>
          <h2 className="text-2xl sm:text-3xl font-bold text-slate-900 dark:text-white">
            Drop-Off Locations
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {dropOffHubs.map((hub, idx) => (
            <div
              key={idx}
              className="bg-white dark:bg-slate-800 p-6 rounded-3xl border border-slate-200 dark:border-slate-700 shadow-sm space-y-4"
            >
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-2xl bg-blue-50 dark:bg-blue-950 text-blue-600 dark:text-blue-400 flex items-center justify-center font-bold">
                  <MapPin className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="font-bold text-slate-900 dark:text-white text-sm">{hub.name}</h3>
                  <div className="text-[11px] text-slate-500">{hub.hours}</div>
                </div>
              </div>

              <div className="text-xs text-slate-600 dark:text-slate-300 space-y-1">
                <p className="font-medium">{hub.address}</p>
                <p className="text-blue-600 dark:text-blue-400">{hub.phone}</p>
              </div>

              <a
                href={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(hub.address)}`}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full bg-slate-100 dark:bg-slate-700 hover:bg-blue-600 hover:text-white text-slate-800 dark:text-slate-200 text-xs font-semibold py-2 rounded-xl text-center block transition-colors"
              >
                Get Directions →
              </a>
            </div>
          ))}
        </div>
      </section>

      {/* DONATION REQUEST / SCHEDULE PICKUP FORM */}
      <section className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-white dark:bg-slate-800 p-8 sm:p-10 rounded-3xl border border-slate-200 dark:border-slate-700 shadow-xl space-y-6">
          <div className="text-center space-y-2">
            <span className="text-xs font-bold uppercase tracking-wider text-emerald-600 dark:text-emerald-400">
              Pledge or Pickup
            </span>
            <h2 className="text-2xl sm:text-3xl font-bold text-slate-900 dark:text-white">
              Book Donation & Pickup Request Form
            </h2>
            <p className="text-xs text-slate-500">
              Pledge your book donation or request a bulk pickup for 25+ books.
            </p>
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
                  Your Full Name *
                </label>
                <input
                  type="text"
                  required
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  placeholder="e.g. Robert Vance"
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
                  placeholder="e.g. robert@example.com"
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
                  placeholder="+1 (925) 577-8603"
                  className="w-full bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-xl px-3.5 py-2.5 text-xs text-slate-900 dark:text-white focus:outline-none focus:border-blue-500"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
                  Estimated Book Count
                </label>
                <input
                  type="number"
                  min="1"
                  required
                  value={formData.bookCount}
                  onChange={(e) => setFormData({ ...formData, bookCount: Number(e.target.value) })}
                  className="w-full bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-xl px-3.5 py-2.5 text-xs text-slate-900 dark:text-white focus:outline-none focus:border-blue-500"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
                  Option
                </label>
                <select
                  value={formData.preferredOption}
                  onChange={(e) => setFormData({ ...formData, preferredOption: e.target.value })}
                  className="w-full bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-xl px-3.5 py-2.5 text-xs text-slate-900 dark:text-white focus:outline-none focus:border-blue-500"
                >
                  <option value="drop_off">I will drop off at a Collection Hub</option>
                  <option value="pickup_request">Request Bulk Home/School Pickup (25+ books)</option>
                  <option value="holding_drive">Hosting a Drive & Need Pickup</option>
                </select>
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
                  Condition Rating
                </label>
                <select
                  value={formData.condition}
                  onChange={(e) => setFormData({ ...formData, condition: e.target.value })}
                  className="w-full bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-xl px-3.5 py-2.5 text-xs text-slate-900 dark:text-white focus:outline-none focus:border-blue-500"
                >
                  <option value="like_new">Like New / Brand New</option>
                  <option value="gently_used">Gently Used / Clean Spines</option>
                  <option value="mixed">Mixed Collection</option>
                </select>
              </div>
            </div>

            {formData.preferredOption !== "drop_off" && (
              <div>
                <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
                  Pickup Address *
                </label>
                <input
                  type="text"
                  required
                  value={formData.address}
                  onChange={(e) => setFormData({ ...formData, address: e.target.value })}
                  placeholder="Street Address, City, Zip Code"
                  className="w-full bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-xl px-3.5 py-2.5 text-xs text-slate-900 dark:text-white focus:outline-none focus:border-blue-500"
                />
              </div>
            )}

            <div>
              <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
                Additional Notes
              </label>
              <textarea
                rows={3}
                value={formData.notes}
                onChange={(e) => setFormData({ ...formData, notes: e.target.value })}
                placeholder="Mention book genres, preferred drop-off date, etc."
                className="w-full bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-xl px-3.5 py-2.5 text-xs text-slate-900 dark:text-white focus:outline-none focus:border-blue-500"
              />
            </div>

            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full bg-emerald-600 hover:bg-emerald-500 text-white font-bold py-3 px-6 rounded-xl text-xs transition-all shadow-md flex items-center justify-center gap-2"
            >
              <Heart className="w-4 h-4 fill-white/20" />
              <span>{isSubmitting ? "Recording Request..." : "Submit Book Donation Request"}</span>
            </button>
          </form>
        </div>
      </section>

      {/* FAQ ACCORDION */}
      <section className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 space-y-6">
        <div className="text-center space-y-2">
          <span className="text-xs font-bold uppercase tracking-wider text-blue-600 dark:text-blue-400">
            Frequently Asked Questions
          </span>
          <h2 className="text-2xl font-bold text-slate-900 dark:text-white">
            Book Donation FAQ
          </h2>
        </div>

        <div className="space-y-3">
          {faqs.map((faq, idx) => (
            <div
              key={idx}
              className="bg-white dark:bg-slate-800 rounded-2xl border border-slate-200 dark:border-slate-700 overflow-hidden"
            >
              <button
                onClick={() => setActiveFaq(activeFaq === idx ? null : idx)}
                className="w-full text-left p-4 font-semibold text-slate-900 dark:text-white text-sm flex items-center justify-between gap-4"
              >
                <span>{faq.q}</span>
                {activeFaq === idx ? <ChevronUp className="w-4 h-4 text-blue-500 shrink-0" /> : <ChevronDown className="w-4 h-4 text-slate-400 shrink-0" />}
              </button>
              {activeFaq === idx && (
                <div className="px-4 pb-4 text-xs text-slate-600 dark:text-slate-300 leading-relaxed border-t border-slate-100 dark:border-slate-700/60 pt-3">
                  {faq.a}
                </div>
              )}
            </div>
          ))}
        </div>
      </section>

    </div>
  );
};
