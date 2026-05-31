"use client";

import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { treks } from "@/data/treks";
import { CheckIcon } from "@/components/ui/Icons";

const hearOptions = ["Google search", "Instagram / Facebook", "A friend's recommendation", "TripAdvisor", "Returning trekker", "Other"];

export default function ContactForm() {
  const [submitting, setSubmitting] = useState(false);
  const [done, setDone] = useState(false);
  const [budget, setBudget] = useState(1500);

  const submit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitting(true);
    setTimeout(() => {
      setSubmitting(false);
      setDone(true);
    }, 1400);
  };

  return (
    <div className="rounded-3xl border border-stone-200 bg-snow p-7 shadow-trek md:p-9">
      <h2 className="font-playfair text-3xl font-bold text-green-900">Plan Your Trek</h2>
      <p className="mt-2 font-lato text-sm text-stone-500">
        Tell us your dream and we&apos;ll craft the itinerary. We reply within 2 hours.
      </p>

      <AnimatePresence mode="wait">
        {done ? (
          <motion.div
            key="ok"
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="flex flex-col items-center py-16 text-center"
          >
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ type: "spring", stiffness: 200, damping: 12 }}
              className="flex h-20 w-20 items-center justify-center rounded-full bg-green-600 text-snow"
            >
              <CheckIcon width={42} height={42} />
            </motion.div>
            <h3 className="mt-6 font-playfair text-2xl font-bold text-green-900">Inquiry sent!</h3>
            <p className="mt-2 max-w-sm font-lato text-stone-500">
              Thank you — one of our guides will be in touch within 2 hours (Nepal time).
            </p>
            <button onClick={() => setDone(false)} className="btn btn-green mt-8">
              Send Another
            </button>
          </motion.div>
        ) : (
          <motion.form
            key="form"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onSubmit={submit}
            className="mt-7 space-y-5"
          >
            <div className="grid gap-5 sm:grid-cols-2">
              <Field label="Full Name" required><input required className={cls} placeholder="Jane Doe" /></Field>
              <Field label="Email Address" required><input required type="email" className={cls} placeholder="you@email.com" /></Field>
            </div>
            <div className="grid gap-5 sm:grid-cols-2">
              <Field label="Phone (optional)"><input className={cls} placeholder="+1 555 000 0000" /></Field>
              <Field label="Preferred Trek">
                <select className={cls} defaultValue="">
                  <option value="" disabled>Select a trek</option>
                  {treks.map((t) => <option key={t.slug}>{t.name}</option>)}
                  <option>Not sure yet</option>
                </select>
              </Field>
            </div>
            <div className="grid gap-5 sm:grid-cols-2">
              <Field label="Preferred Start Date"><input type="date" className={cls} /></Field>
              <Field label="Group Size"><input type="number" min={1} max={20} defaultValue={2} className={cls} /></Field>
            </div>
            <Field label={`Budget per person · $${budget.toLocaleString()}`}>
              <input
                type="range"
                min={300}
                max={3000}
                step={50}
                value={budget}
                onChange={(e) => setBudget(Number(e.target.value))}
                className="h-2 w-full cursor-pointer appearance-none rounded-full bg-stone-200 accent-amber-500"
              />
            </Field>
            <Field label="Message / Special Requirements">
              <textarea rows={4} className={`${cls} resize-y`} placeholder="Dietary needs, fitness level, must-see places…" />
            </Field>
            <Field label="How did you hear about us?">
              <select className={cls} defaultValue="">
                <option value="" disabled>Select one</option>
                {hearOptions.map((o) => <option key={o}>{o}</option>)}
              </select>
            </Field>

            <button type="submit" disabled={submitting} className="btn btn-amber w-full">
              {submitting ? (
                <>
                  <span className="h-4 w-4 animate-spin rounded-full border-2 border-green-900/30 border-t-green-900" />
                  Sending…
                </>
              ) : (
                "Send Inquiry"
              )}
            </button>
          </motion.form>
        )}
      </AnimatePresence>
    </div>
  );
}

const cls =
  "mt-2 w-full rounded-xl border border-stone-200 bg-warm px-4 py-2.5 font-lato text-sm text-green-900 outline-none transition-colors focus:border-amber-400";

function Field({ label, required, children }: { label: string; required?: boolean; children: React.ReactNode }) {
  return (
    <label className="block">
      <span className="font-montserrat text-xs font-semibold uppercase tracking-widest text-stone-600">
        {label} {required && <span className="text-amber-600">*</span>}
      </span>
      {children}
    </label>
  );
}
