import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowRight, ShoppingBasket, ShieldCheck } from "lucide-react";

import { Button } from "@/components/ui/button";
import { RecordCard } from "@/components/vinilo/RecordCard";
import { records } from "@/data/vinilo";

export const Route = createFileRoute("/how-it-works")({
  head: () => ({
    meta: [
      { title: "How It Works — Vinilo" },
      {
        name: "description",
        content: "Learn how to buy and sell vinyl records safely on Vinilo.",
      },
    ],
  }),
  component: HowItWorks,
});


function HowItWorks() {
  const steps = [
    {
      title: "Browse & discover",
      body: "Search by genre, artist, or pressing. Every listing shows media and sleeve grades, tracklists, and seller ratings.",
    },
    {
      title: "Buy with confidence",
      body: "Add records to your crate and checkout securely. Condition guarantees protect you if something doesn't match the listing.",
    },
    {
      title: "Sell in minutes",
      body: "List a record with our grading template. We help with pricing suggestions, shipping labels, and fast payouts.",
    },
    {
      title: "Collect & repeat",
      body: "Track orders, leave reviews, and build your collection. The more you trade, the more trust you earn.",
    },
  ];

  return (
    <div className="paper-grain">
      <section className="border-b border-border bg-background/80">
        <div className="mx-auto max-w-7xl px-5 py-10 lg:px-8">
          <p className="label-mono text-primary">Simple & safe</p>
          <h1 className="mt-3 text-[clamp(2.25rem,5vw,3.5rem)] leading-[0.95]">
            How it <em className="text-primary">works</em>
          </h1>
          <p className="mt-3 max-w-2xl text-[15px] leading-relaxed text-muted-foreground">
            Vinilo is built for collectors who care about the details. Here's how we make buying and
            selling vinyl feel as good as the music.
          </p>
        </div>
      </section>

      <section className="bg-background py-16">
        <div className="mx-auto max-w-7xl px-5 lg:px-8">
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {steps.map((s, i) => (
              <div
                key={s.title}
                className="animate-rise hover-lift border border-border bg-card p-6 shadow-sleeve"
                style={{ animationDelay: `${i * 80}ms` }}
              >
                <span className="label-mono text-primary">Step {i + 1}</span>
                <h3 className="mt-2 font-display text-xl">{s.title}</h3>
                <p className="mt-2 text-sm text-muted-foreground">{s.body}</p>
              </div>
            ))}
          </div>

          <div className="mt-16 grid gap-8 lg:grid-cols-2">
            <div className="border border-border p-8">
              <ShoppingBasket className="h-8 w-8 text-primary" />
              <h3 className="mt-4 font-display text-2xl">For buyers</h3>
              <ul className="mt-4 list-disc space-y-2 pl-5 text-sm text-muted-foreground">
                <li>Transparent condition grades on every listing</li>
                <li>Free returns if the grade is wrong</li>
                <li>Read seller reviews before you buy</li>
                <li>Track your crate from checkout to delivery</li>
              </ul>
            </div>
            <div className="border border-border p-8">
              <ShieldCheck className="h-8 w-8 text-primary" />
              <h3 className="mt-4 font-display text-2xl">For sellers</h3>
              <ul className="mt-4 list-disc space-y-2 pl-5 text-sm text-muted-foreground">
                <li>Grading template and pricing suggestions</li>
                <li>Printed shipping labels included</li>
                <li>Payouts within 48 hours of delivery</li>
                <li>Seller badges that build trust</li>
              </ul>
            </div>
          </div>

          <div className="mt-16">
            <p className="label-mono text-primary">Fresh listings</p>
            <div className="mt-6 grid gap-x-6 gap-y-12 sm:grid-cols-2 lg:grid-cols-3">
              {records.slice(0, 3).map((r, i) => (
                <RecordCard key={r.id} record={r} index={i} />
              ))}
            </div>
            <div className="mt-8 text-center">
              <Button asChild className="label-mono h-11 rounded-sm px-6">
                <Link to="/browse">
                  Browse all records <ArrowRight className="ml-2 h-4 w-4" />
                </Link>
              </Button>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
