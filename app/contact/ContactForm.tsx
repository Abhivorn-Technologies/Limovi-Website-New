"use client";

import { useState } from "react";
import { whatsappLink } from "@/lib/contact";

const field =
  "w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-[#005CB9] transition-all";

// The site has no mail backend, so a message is handed to WhatsApp, the same
// channel the Early Access form uses.
export function ContactForm() {
  const [first, setFirst] = useState("");
  const [last, setLast] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [sent, setSent] = useState(false);

  const submit = (e: React.FormEvent) => {
    e.preventDefault();
    const text = `Hello LIMOVI Team,\n\n${message.trim()}\n\nName: ${`${first} ${last}`.trim()}\nEmail: ${email.trim()}`;
    window.open(whatsappLink(text), "_blank", "noopener,noreferrer");
    setSent(true);
  };

  return (
    <form className="space-y-5" onSubmit={submit}>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
        <label className="space-y-1.5 block">
          <span className="text-sm font-bold text-slate-700">First Name</span>
          <input required type="text" value={first} onChange={(e) => setFirst(e.target.value)} className={field} placeholder="John" />
        </label>
        <label className="space-y-1.5 block">
          <span className="text-sm font-bold text-slate-700">Last Name</span>
          <input type="text" value={last} onChange={(e) => setLast(e.target.value)} className={field} placeholder="Doe" />
        </label>
      </div>
      <label className="space-y-1.5 block">
        <span className="text-sm font-bold text-slate-700">Email Address</span>
        <input required type="email" value={email} onChange={(e) => setEmail(e.target.value)} className={field} placeholder="john@example.com" />
      </label>
      <label className="space-y-1.5 block">
        <span className="text-sm font-bold text-slate-700">Message</span>
        <textarea required rows={4} value={message} onChange={(e) => setMessage(e.target.value)} className={`${field} resize-none`} placeholder="How can we help you?" />
      </label>
      <button type="submit" className="w-full bg-[#005CB9] hover:bg-[#004791] text-white font-bold py-3.5 rounded-xl transition-colors shadow-sm">
        Send Message
      </button>
      <p className="text-center text-xs text-slate-500" aria-live="polite">
        {sent ? "WhatsApp opened in a new tab. Press send there to reach us." : "Your message opens in WhatsApp, ready to send to the LIMOVI team."}
      </p>
    </form>
  );
}
