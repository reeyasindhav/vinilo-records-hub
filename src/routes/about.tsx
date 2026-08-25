import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowRight } from "lucide-react";

import { Button } from "@/components/ui/button";

export const Route = createFileRoute("/about")({
  head: () => ({
    meta: [
      { title: "About — Vinilo" },
      {
        name: "description",
        content: "Learn more about Vinilo, the collector-first vinyl marketplace.",
      },
    ],
  }),
  component: About,
});

function About() {
  return (
    <div className="paper-grain">
      <section className="border-b border-border bg-background/80">
        <div className="mx-auto max-w-7xl px-5 py-10 lg:px-8">
          <p className="label-mono text-primary">Our story</p>
          <h1 className="mt-3 text-[clamp(2.25rem,5vw,3.5rem)] leading-[0.95]">
            About <em className="text-primary">Vinilo</em>
          </h1>
          <p className="mt-3 max-w-2xl text-[15px] leading-relaxed text-muted-foreground">
            Vinilo is a marketplace built for collectors who care about honest grading, careful
            packing, and the music itself. We started as a small community of diggers and grew into
            a trusted platform for buying and selling real vinyl.
          </p>
        </div>
      </section>

      <section className="bg-background py-16">
        <div className="mx-auto max-w-7xl px-5 lg:px-8">
          <div className="grid gap-8 lg:grid-cols-3">
            <div className="border border-border p-6">
              <p className="label-mono text-primary">Mission</p>
              <h3 className="mt-2 font-display text-xl">Trust in every transaction</h3>
              <p className="mt-2 text-sm text-muted-foreground">
                We make sure condition grades are accurate, sellers are responsive, and buyers feel
                protected from click to crate.
              </p>
            </div>
            <div className="border border-border p-6">
              <p className="label-mono text-primary">Quality</p>
              <h3 className="mt-2 font-display text-xl">Real records, real people</h3>
              <p className="mt-2 text-sm text-muted-foreground">
                Every listing includes media and sleeve grades, tracklists, and honest notes so
                nothing is left to guesswork.
              </p>
            </div>
            <div className="border border-border p-6">
              <p className="label-mono text-primary">Community</p>
              <h3 className="mt-2 font-display text-xl">Built by collectors</h3>
              <p className="mt-2 text-sm text-muted-foreground">
                Vinilo is shaped by the people who use it: sellers, buyers, reviewers, and anyone
                who believes vinyl deserves better.
              </p>
            </div>
          </div>

          <div className="mt-16 grid gap-8 lg:grid-cols-2">
            <div>
              <p className="label-mono text-primary">Contact</p>
              <h2 className="mt-2 font-display text-2xl">Get in touch</h2>
              <p className="mt-2 text-sm text-muted-foreground">
                Questions, feedback, or partnership ideas? Reach out and we usually reply within a
                few hours.
              </p>
              <Button asChild className="label-mono mt-6 h-11 rounded-sm px-6">
                <Link to="/contact">
                  Contact us <ArrowRight className="ml-2 h-4 w-4" />
                </Link>
              </Button>
            </div>
            <div>
              <p className="label-mono text-primary">Explore</p>
              <h2 className="mt-2 font-display text-2xl">See Vinilo in action</h2>
              <p className="mt-2 text-sm text-muted-foreground">
                Browse the marketplace, read seller reviews, and find your next record.
              </p>
              <Button asChild className="label-mono mt-6 h-11 rounded-sm px-6">
                <Link to="/browse">
                  Browse records <ArrowRight className="ml-2 h-4 w-4" />
                </Link>
              </Button>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
