import { createFileRoute, Link } from "@tanstack/react-router";
import { ChevronDown } from "lucide-react";
import { useState } from "react";

import { Button } from "@/components/ui/button";

export const Route = createFileRoute("/faq")({
  head: () => ({
    meta: [
      { title: "FAQ — Vinilo" },
      {
        name: "description",
        content: "Frequently asked questions about buying and selling vinyl on Vinilo.",
      },
    ],
  }),
  component: Faq,
});

const faqs = [
  {
    q: "How does grading work?",
    a: "Listings show both media grade and sleeve grade. We recommend using Goldmine standards when grading, and sellers are expected to note any non-grading flaws in the listing.",
  },
  {
    q: "Do you cover shipping?",
    a: "Free shipping applies to orders over $75. For other orders, the seller chooses a shipping rate at checkout. We also offer tracked shipping in most regions.",
  },
  {
    q: "What if my record arrives damaged?",
    a: "If it arrives damaged or not as described, open a case within 48 hours. We review seller response times and may issue a full refund or replacement depending on the situation.",
  },
  {
    q: "How long does delivery take?",
    a: "Most domestic orders arrive in 3–7 business days. International delivery varies by seller and destination. You’ll get tracking once the item ships.",
  },
  {
    q: "How do I become a seller?",
    a: "Sign in, go to your dashboard, and submit a seller application. Once approved, you can create listings with our grading template and pricing suggestions.",
  },
  {
    q: "When do sellers get paid?",
    a: "Payouts are usually released within 48 hours after the buyer confirms delivery. You can cash out once your balance reaches the minimum threshold.",
  },
];

function Faq() {
  const [open, setOpen] = useState<string | null>(null);

  return (
    <div className="paper-grain">
      <section className="border-b border-border bg-background/80">
        <div className="mx-auto max-w-7xl px-5 py-10 lg:px-8">
          <p className="label-mono text-primary">Help center</p>
          <h1 className="mt-3 text-[clamp(2.25rem,5vw,3.5rem)] leading-[0.95]">
            Frequently asked <em className="text-primary">questions</em>
          </h1>
          <p className="mt-3 max-w-2xl text-[15px] leading-relaxed text-muted-foreground">
            Answers for buyers and sellers. If you can’t find what you need, reach out and we’ll
            help.
          </p>
        </div>
      </section>

      <section className="bg-background py-16">
        <div className="mx-auto max-w-3xl px-5 lg:px-8">
          <div className="space-y-3">
            {faqs.map((item) => (
              <div key={item.q} className="border border-border">
                <button
                  onClick={() => setOpen((prev) => (prev === item.q ? null : item.q))}
                  className="flex w-full items-center justify-between p-4 text-left"
                >
                  <span className="font-display text-lg">{item.q}</span>
                  <ChevronDown
                    className={`h-5 w-5 transition-transform ${
                      open === item.q ? "rotate-180" : ""
                    }`}
                  />
                </button>
                {open === item.q && (
                  <div className="border-t border-border p-4 text-sm text-muted-foreground">
                    {item.a}
                  </div>
                )}
              </div>
            ))}
          </div>

          <div className="mt-12 text-center">
            <p className="label-mono text-primary">Still need help?</p>
            <h2 className="mt-2 font-display text-2xl">We’re here for you</h2>
            <p className="mt-2 text-sm text-muted-foreground">
              Tell us what’s going on and we’ll get back to you.
            </p>
            <Button asChild className="label-mono mt-6 h-11 rounded-sm px-6">
              <Link to="/contact">Contact us</Link>
            </Button>
          </div>
        </div>
      </section>
    </div>
  );
}
