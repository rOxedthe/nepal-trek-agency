import type { Metadata } from "next";
import PageHero from "@/components/ui/PageHero";
import AnimatedBackground from "@/components/ui/AnimatedBackground";
import SectionHeading from "@/components/ui/SectionHeading";
import ContactForm from "@/components/contact/ContactForm";
import FaqAccordion from "@/components/contact/FaqAccordion";
import { PinIcon, PhoneIcon, MailIcon, ClockIcon } from "@/components/ui/Icons";

export const metadata: Metadata = {
  title: "Contact",
  description:
    "Plan your Himalayan trek with Nepal Trek Agency. Based in Boudha, Kathmandu — we typically respond within 2 hours.",
};

const info = [
  { Icon: PinIcon, label: "Address", value: "GPO Box 24725, Mahankal-6, Boudha, Kathmandu, Nepal" },
  { Icon: PhoneIcon, label: "Phone", value: "+977-9866690671", href: "tel:+9779866690671" },
  { Icon: MailIcon, label: "Email", value: "info@nepaltrekagency.com", href: "mailto:info@nepaltrekagency.com" },
  { Icon: ClockIcon, label: "Office Hours", value: "Mon–Sat · 9am–6pm (Nepal Time, UTC+5:45)" },
];

export default function ContactPage() {
  return (
    <>
      <PageHero
        eyebrow="Let's Talk Mountains"
        title="Plan Your Trek"
        subtitle="Local experts, real answers — usually within two hours."
        image="https://images.unsplash.com/photo-1585409677983-0f6c41ca9c3b?w=1600&q=80&auto=format&fit=crop"
        variant="footprints"
        height="h-[46vh]"
        crumbs={[{ label: "Home", href: "/" }, { label: "Contact" }]}
      />

      <section className="relative overflow-hidden bg-warm section-pad">
        <AnimatedBackground variant="contours" tone="dark" />
        <div className="container-trek relative z-10 grid gap-10 lg:grid-cols-5">
          <div className="lg:col-span-3">
            <ContactForm />
          </div>

          <div className="space-y-6 lg:col-span-2">
            <div className="rounded-3xl bg-green-900 p-7 text-snow shadow-trek">
              <h3 className="font-playfair text-2xl font-bold">Get In Touch</h3>
              <ul className="mt-6 space-y-5">
                {info.map((item) => (
                  <li key={item.label} className="flex gap-4">
                    <span className="flex h-10 w-10 flex-none items-center justify-center rounded-xl bg-green-700 text-amber-300">
                      <item.Icon width={20} height={20} />
                    </span>
                    <div>
                      <p className="font-montserrat text-[10px] uppercase tracking-widest text-snow/50">{item.label}</p>
                      {item.href ? (
                        <a href={item.href} className="font-lato text-sm text-snow hover:text-amber-300">{item.value}</a>
                      ) : (
                        <p className="font-lato text-sm text-snow/90">{item.value}</p>
                      )}
                    </div>
                  </li>
                ))}
              </ul>
              <div className="mt-6 rounded-xl bg-green-700/10 px-4 py-3 font-montserrat text-xs text-green-700">
                ⚡ We typically respond within 2 hours.
              </div>
            </div>

            <div className="overflow-hidden rounded-3xl border border-stone-200 shadow-trek">
              <iframe
                title="Nepal Trek Agency location — Boudha, Kathmandu"
                src="https://www.google.com/maps?q=Boudhanath+Stupa+Kathmandu&output=embed"
                className="h-72 w-full"
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
              />
            </div>
          </div>
        </div>
      </section>

      <section className="relative overflow-hidden bg-stone-100 section-pad">
        <AnimatedBackground variant="eagles" tone="dark" />
        <div className="container-trek relative z-10">
          <SectionHeading
            eyebrow="Good To Know"
            title="Frequently Asked Questions"
            subtitle="Everything you need to know before lacing up your boots."
          />
          <div className="mt-12">
            <FaqAccordion />
          </div>
        </div>
      </section>
    </>
  );
}
