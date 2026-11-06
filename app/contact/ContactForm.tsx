"use client";

import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { ArrowRight, CheckCircle2 } from "lucide-react";
import { whatsappLink } from "@/lib/contact";

const topics = ["General question", "Early access", "Jewellery Cloud", "Gold Loan", "Gold Liquidity", "Owner Benefit", "Gift Gold", "Complaint"];

const field =
  "peer w-full rounded-2xl border-2 border-lm-line bg-white px-4 pb-2.5 pt-6 text-[15px] text-lm-navy outline-none transition-colors placeholder-transparent focus:border-lm-blue";
const floatLabel =
  "pointer-events-none absolute left-4 top-2 text-xs font-bold text-lm-muted transition-all peer-placeholder-shown:top-4 peer-placeholder-shown:text-[15px] peer-placeholder-shown:font-medium peer-focus:top-2 peer-focus:text-xs peer-focus:font-bold peer-focus:text-lm-blue";

// The site has no mail backend, so a message is handed to WhatsApp, the same
// channel the Early Access form uses.
export function ContactForm() {
  const [topic, setTopic] = useState(topics[0]);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [message, setMessage] = useState("");
  const [sent, setSent] = useState(false);

  const submit = (e: React.FormEvent) => {
    e.preventDefault();
    const lines = [`Hello LIMOVI Team,`, ``, `Topic: ${topic}`, ``, message.trim(), ``, `Name: ${name.trim()}`, `Email: ${email.trim()}`];
    if (phone.trim()) lines.push(`Phone: ${phone.trim()}`);
    window.open(whatsappLink(lines.join("\n")), "_blank", "noopener,noreferrer");
    setSent(true);
  };

  return (
    <form onSubmit={submit} className="space-y-5">
      <fieldset>
        <legend className="mb-3 text-sm font-bold text-lm-navy">What&apos;s it about?</legend>
        <div className="flex flex-wrap gap-2">
          {topics.map((t) => (
            <button
              type="button"
              key={t}
              onClick={() => setTopic(t)}
              aria-pressed={topic === t}
              className={`relative rounded-full px-4 py-2 text-sm font-semibold transition-colors ${
                topic === t ? "text-white" : "bg-lm-sky text-lm-navy hover:bg-lm-sky-2"
              }`}
            >
              {topic === t && <motion.span layoutId="topic-pill" className="absolute inset-0 rounded-full bg-lm-blue" transition={{ type: "spring", stiffness: 380, damping: 30 }} />}
              <span className="relative">{t}</span>
            </button>
          ))}
        </div>
      </fieldset>

      <div className="grid gap-4 sm:grid-cols-2">
        <label className="relative block">
          <input required id="c-name" value={name} onChange={(e) => setName(e.target.value)} placeholder="Your name" className={field} />
          <span className={floatLabel}>Your name</span>
        </label>
        <label className="relative block">
          <input type="tel" value={phone} onChange={(e) => setPhone(e.target.value)} placeholder="Phone (optional)" className={field} />
          <span className={floatLabel}>Phone (optional)</span>
        </label>
      </div>
      <label className="relative block">
        <input required type="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="Email address" className={field} />
        <span className={floatLabel}>Email address</span>
      </label>
      <label className="relative block">
        <textarea required rows={5} value={message} onChange={(e) => setMessage(e.target.value)} placeholder="How can we help?" className={`${field} resize-none`} />
        <span className={floatLabel}>How can we help?</span>
      </label>

      <button type="submit" className="lm-btn lm-btn-blue lm-shine w-full !min-h-[56px] text-base">
        Send on WhatsApp <ArrowRight size={18} />
      </button>

      <AnimatePresence mode="wait">
        <motion.p
          key={sent ? "sent" : "idle"}
          initial={{ opacity: 0, y: 6 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0 }}
          className={`flex items-center justify-center gap-2 text-center text-sm ${sent ? "font-semibold text-emerald-600" : "text-lm-muted"}`}
          aria-live="polite"
        >
          {sent && <CheckCircle2 size={16} />}
          {sent ? "WhatsApp opened in a new tab. Press send there to reach us." : "Your message opens in WhatsApp, ready to send to the LIMOVI team."}
        </motion.p>
      </AnimatePresence>
    </form>
  );
}
