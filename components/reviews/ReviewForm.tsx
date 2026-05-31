"use client";

import { useRef, useState } from "react";
import Image from "next/image";
import { AnimatePresence, motion } from "framer-motion";
import { countries } from "@/data/reviews";
import { treks } from "@/data/treks";
import StarRating from "@/components/ui/StarRating";
import { CheckIcon } from "@/components/ui/Icons";

interface FormState {
  name: string;
  country: string;
  email: string;
  trek: string;
  date: string;
  rating: number;
  review: string;
}

const empty: FormState = {
  name: "",
  country: "",
  email: "",
  trek: "",
  date: "",
  rating: 0,
  review: "",
};

const MIN_REVIEW = 100;

export default function ReviewForm() {
  const [form, setForm] = useState<FormState>(empty);
  const [touched, setTouched] = useState<Record<string, boolean>>({});
  const [photo, setPhoto] = useState<string | null>(null);
  const [submitting, setSubmitting] = useState(false);
  const [done, setDone] = useState(false);
  const fileRef = useRef<HTMLInputElement>(null);

  const errors: Partial<Record<keyof FormState, string>> = {
    name: form.name.trim().length < 2 ? "Please enter your name" : "",
    country: !form.country ? "Select your country" : "",
    email: /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email) ? "" : "Enter a valid email",
    trek: !form.trek ? "Select the trek you took" : "",
    date: !form.date ? "Select the month of your trek" : "",
    rating: form.rating === 0 ? "Tap to rate your experience" : "",
    review:
      form.review.trim().length < MIN_REVIEW
        ? `At least ${MIN_REVIEW} characters (${form.review.trim().length}/${MIN_REVIEW})`
        : "",
  };

  const valid = Object.values(errors).every((e) => !e);

  const set = (key: keyof FormState, value: string | number) =>
    setForm((f) => ({ ...f, [key]: value }));
  const blur = (key: string) => setTouched((t) => ({ ...t, [key]: true }));

  const onPhoto = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) setPhoto(URL.createObjectURL(file));
  };

  const submit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!valid) {
      setTouched({
        name: true, country: true, email: true, trek: true, date: true, rating: true, review: true,
      });
      return;
    }
    setSubmitting(true);
    setTimeout(() => {
      setSubmitting(false);
      setDone(true);
    }, 1400);
  };

  return (
    <section className="relative overflow-hidden bg-warm section-pad">
      <div className="container-trek relative z-10 max-w-3xl">
        <div className="overflow-hidden rounded-3xl border-t-4 border-green-700 bg-snow shadow-trek">
          <div className="border-b border-stone-200 px-8 py-7">
            <p className="eyebrow text-amber-600">We&apos;d Love To Hear From You</p>
            <h2 className="mt-2 font-playfair text-3xl font-bold text-green-900">Share Your Experience</h2>
            <p className="mt-2 font-lato text-sm text-stone-500">
              Help future trekkers by sharing your story. Reviews appear after verification.
            </p>
          </div>

          <AnimatePresence mode="wait">
            {done ? (
              <motion.div
                key="success"
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                className="flex flex-col items-center px-8 py-20 text-center"
              >
                <motion.div
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ type: "spring", stiffness: 200, damping: 12 }}
                  className="flex h-20 w-20 items-center justify-center rounded-full bg-green-600 text-snow"
                >
                  <CheckIcon width={42} height={42} />
                </motion.div>
                <h3 className="mt-6 font-playfair text-2xl font-bold text-green-900">Thank you!</h3>
                <p className="mt-2 max-w-sm font-lato text-stone-500">
                  Your review will appear after verification. We&apos;re grateful you trekked with us.
                </p>
                <button
                  onClick={() => {
                    setForm(empty);
                    setTouched({});
                    setPhoto(null);
                    setDone(false);
                  }}
                  className="btn btn-green mt-8"
                >
                  Write Another Review
                </button>
              </motion.div>
            ) : (
              <motion.form
                key="form"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                onSubmit={submit}
                noValidate
                className="space-y-6 px-8 py-8"
              >
                <div className="grid gap-6 sm:grid-cols-2">
                  <Input label="Full Name" required value={form.name} onChange={(v) => set("name", v)} onBlur={() => blur("name")} error={touched.name ? errors.name : ""} placeholder="Jane Doe" />
                  <Selectable label="Country" required value={form.country} onChange={(v) => set("country", v)} onBlur={() => blur("country")} error={touched.country ? errors.country : ""} options={countries} placeholder="Select country" />
                </div>

                <div className="grid gap-6 sm:grid-cols-2">
                  <Input label="Email" type="email" required value={form.email} onChange={(v) => set("email", v)} onBlur={() => blur("email")} error={touched.email ? errors.email : ""} placeholder="you@email.com" note="Not published" />
                  <Selectable label="Trek Taken" required value={form.trek} onChange={(v) => set("trek", v)} onBlur={() => blur("trek")} error={touched.trek ? errors.trek : ""} options={treks.map((t) => t.name)} placeholder="Select trek" />
                </div>

                <div className="grid gap-6 sm:grid-cols-2">
                  <div>
                    <Label required>Date of Trek</Label>
                    <input
                      type="month"
                      value={form.date}
                      onChange={(e) => set("date", e.target.value)}
                      onBlur={() => blur("date")}
                      className={inputCls(touched.date ? errors.date : "")}
                    />
                    <FieldError msg={touched.date ? errors.date : ""} ok={!!form.date} />
                  </div>
                  <div>
                    <Label required>Your Rating</Label>
                    <div className="rounded-xl border border-stone-200 bg-warm px-4 py-2.5">
                      <StarRating value={form.rating} onChange={(v) => { set("rating", v); blur("rating"); }} interactive size={28} />
                    </div>
                    <FieldError msg={touched.rating ? errors.rating : ""} ok={form.rating > 0} />
                  </div>
                </div>

                <div>
                  <div className="flex items-center justify-between">
                    <Label required>Your Review</Label>
                    <span className={`font-montserrat text-xs ${form.review.trim().length >= MIN_REVIEW ? "text-green-600" : "text-stone-500"}`}>
                      {form.review.trim().length} / {MIN_REVIEW}
                    </span>
                  </div>
                  <textarea
                    rows={5}
                    value={form.review}
                    onChange={(e) => set("review", e.target.value)}
                    onBlur={() => blur("review")}
                    placeholder="Tell us about the guides, the trail, the views…"
                    className={`${inputCls(touched.review ? errors.review : "")} resize-y`}
                  />
                  <FieldError msg={touched.review ? errors.review : ""} ok={form.review.trim().length >= MIN_REVIEW} />
                </div>

                <div>
                  <Label>Upload Photo <span className="font-normal text-stone-400">(optional)</span></Label>
                  <div className="flex items-center gap-4">
                    <button
                      type="button"
                      onClick={() => fileRef.current?.click()}
                      className="rounded-xl border border-dashed border-stone-300 bg-warm px-5 py-3 font-montserrat text-sm text-stone-500 transition-colors hover:border-amber-400 hover:text-amber-600"
                    >
                      Choose image
                    </button>
                    {photo && (
                      <div className="relative h-16 w-16 overflow-hidden rounded-lg">
                        <Image src={photo} alt="Upload preview" fill className="object-cover" />
                      </div>
                    )}
                    <input ref={fileRef} type="file" accept="image/*" onChange={onPhoto} className="hidden" />
                  </div>
                </div>

                <button
                  type="submit"
                  disabled={!valid || submitting}
                  className={`btn w-full ${valid && !submitting ? "btn-amber" : "cursor-not-allowed bg-stone-200 text-stone-500"}`}
                >
                  {submitting ? (
                    <>
                      <span className="h-4 w-4 animate-spin rounded-full border-2 border-green-900/30 border-t-green-900" />
                      Sending…
                    </>
                  ) : (
                    "Submit Review"
                  )}
                </button>
              </motion.form>
            )}
          </AnimatePresence>
        </div>
      </div>
    </section>
  );
}

function inputCls(error?: string) {
  return `mt-2 w-full rounded-xl border bg-warm px-4 py-2.5 font-lato text-sm text-green-900 outline-none transition-colors focus:border-amber-400 ${
    error ? "border-red-400" : "border-stone-200"
  }`;
}

function Label({ children, required }: { children: React.ReactNode; required?: boolean }) {
  return (
    <label className="block font-montserrat text-xs font-semibold uppercase tracking-widest text-stone-600">
      {children} {required && <span className="text-amber-600">*</span>}
    </label>
  );
}

function FieldError({ msg, ok }: { msg?: string; ok?: boolean }) {
  if (msg) return <p className="mt-1.5 font-montserrat text-xs text-red-500">{msg}</p>;
  if (ok)
    return (
      <p className="mt-1.5 inline-flex items-center gap-1 font-montserrat text-xs text-green-600">
        <CheckIcon width={12} height={12} /> Looks good
      </p>
    );
  return null;
}

function Input({
  label, value, onChange, onBlur, error, placeholder, type = "text", required, note,
}: {
  label: string; value: string; onChange: (v: string) => void; onBlur: () => void;
  error?: string; placeholder?: string; type?: string; required?: boolean; note?: string;
}) {
  return (
    <div>
      <Label required={required}>
        {label} {note && <span className="font-normal lowercase text-stone-400">· {note}</span>}
      </Label>
      <input
        type={type}
        value={value}
        placeholder={placeholder}
        onChange={(e) => onChange(e.target.value)}
        onBlur={onBlur}
        className={inputCls(error)}
      />
      <FieldError msg={error} ok={!error && value.length > 0} />
    </div>
  );
}

function Selectable({
  label, value, onChange, onBlur, error, options, placeholder, required,
}: {
  label: string; value: string; onChange: (v: string) => void; onBlur: () => void;
  error?: string; options: string[]; placeholder?: string; required?: boolean;
}) {
  return (
    <div>
      <Label required={required}>{label}</Label>
      <select
        value={value}
        onChange={(e) => onChange(e.target.value)}
        onBlur={onBlur}
        className={inputCls(error)}
      >
        <option value="" disabled>{placeholder}</option>
        {options.map((o) => (
          <option key={o} value={o}>{o}</option>
        ))}
      </select>
      <FieldError msg={error} ok={!error && value.length > 0} />
    </div>
  );
}
