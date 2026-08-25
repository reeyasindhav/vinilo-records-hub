import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowRight, Star } from "lucide-react";

import { Button } from "@/components/ui/button";
import { GradeBadge } from "@/components/vinilo/GradeBadge";
import { RecordCard } from "@/components/vinilo/RecordCard";
import { SpinningRecord } from "@/components/vinilo/SpinningRecord";
import { grades, records, sellers, type Grade } from "@/data/vinilo";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Vinilo — Find the Sound You've Been Missing" },
      {
        name: "description",
        content:
          "A collector-run vinyl marketplace with transparent condition badges, genre filters, and trusted seller profiles.",
      },
      { property: "og:title", content: "Vinilo — Find the Sound You've Been Missing" },
      {
        property: "og:description",
        content: "Buy, sell, and trade records with people who care about the details.",
      },
    ],
  }),
  component: Home,
});

function Home() {
  const featured = records.filter((r) => r.featured).slice(0, 6);
  const gradeKeys: Grade[] = ["NM", "VG+", "VG", "G+"];

  return (
    <>
      {/* Hero */}
      <section className="paper-grain overflow-hidden">
        <div className="mx-auto grid max-w-7xl items-center gap-12 px-5 py-16 lg:grid-cols-[1.05fr_1fr] lg:px-8 lg:py-24">
          <div className="animate-rise">
            <p className="label-mono text-primary">The collector's marketplace</p>
            <h1 className="mt-5 text-[clamp(2.75rem,6.5vw,5rem)] leading-[0.95]">
              Find the <em className="text-primary">sound</em> you've been missing.
            </h1>
            <p className="mt-6 max-w-md text-[15px] leading-relaxed text-muted-foreground">
              Buy, sell, and trade records with people who care about the details. Honest grades,
              rare pressings, and a little more soul.
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              <Button
                asChild
                className="label-mono h-11 rounded-sm px-5 shadow-sleeve transition-transform hover:-translate-y-0.5"
              >
                <Link to="/browse">
                  Explore records <ArrowRight className="ml-2 h-4 w-4" />
                </Link>
              </Button>
              <Button
                asChild
                variant="outline"
                className="label-mono h-11 rounded-sm border-foreground/25 bg-transparent px-5 hover:bg-foreground hover:text-background"
              >
                <Link to="/signup">Sell your collection</Link>
              </Button>
            </div>

            <dl className="mt-12 grid max-w-lg grid-cols-3 gap-6 border-t border-border pt-6">
              {[
                { v: "12k+", l: "Records listed" },
                { v: "4.9/5", l: "Collector rating" },
                { v: "100%", l: "Condition checked" },
              ].map((s) => (
                <div key={s.l}>
                  <dt className="font-display text-2xl">{s.v}</dt>
                  <dd className="label-mono mt-1 text-muted-foreground">{s.l}</dd>
                </div>
              ))}
            </dl>
          </div>

          <div className="relative animate-fade-in">
            <div className="relative bg-tan p-10 shadow-sleeve sm:p-14">
              <SpinningRecord className="mx-auto w-full max-w-sm" />
              <span className="label-mono absolute bottom-4 left-4 bg-background px-3 py-1.5">
                Listen closer
              </span>
            </div>
            <div className="absolute -bottom-6 -right-2 rotate-[-3deg] bg-background px-5 py-3 shadow-sleeve">
              <p className="font-display text-lg italic">good records, good people</p>
            </div>
          </div>
        </div>
      </section>

      {/* Featured grid */}
      <section className="bg-ink py-20 text-ink-foreground">
        <div className="mx-auto max-w-7xl px-5 lg:px-8">
          <div className="flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
            <div>
              <p className="label-mono text-tan">Fresh from the crates</p>
              <h2 className="mt-4 text-[clamp(2rem,4vw,3rem)] leading-tight">
                Find your next spin.
              </h2>
            </div>
            <p className="max-w-xs text-sm text-ink-muted">
              Every listing includes a clear condition grade, photos, and a seller you can trust.
            </p>
          </div>

          <div className="mt-10 flex flex-wrap gap-2 border-b border-ink-border pb-6">
            {["All records", "Jazz", "Rock", "Hip-Hop", "Electronic", "Folk"].map((g, i) => (
              <Link
                key={g}
                to="/browse"
                search={i === 0 ? undefined : { genre: g }}
                className="label-mono rounded-sm border border-ink-border px-3 py-2 text-ink-muted transition-colors hover:border-tan hover:text-tan"
              >
                {g}
              </Link>
            ))}
          </div>

          <div className="mt-10 grid gap-x-6 gap-y-12 sm:grid-cols-2 lg:grid-cols-3">
            {featured.map((r, i) => (
              <RecordCard key={r.id} record={r} onDark index={i} />
            ))}
          </div>

          <div className="mt-12 text-center">
            <Link to="/browse" className="label-mono text-tan underline-sweep">
              See all 12,400 listings →
            </Link>
          </div>
        </div>
      </section>

      {/* Condition guide teaser */}
      <section className="py-20">
        <div className="mx-auto grid max-w-7xl items-center gap-12 px-5 lg:grid-cols-2 lg:px-8">
          <div>
            <p className="label-mono text-primary">Our condition guide</p>
            <h2 className="mt-4 text-[clamp(2rem,4vw,3rem)] leading-tight">
              Know exactly what you're getting.
            </h2>
            <p className="mt-5 max-w-md text-[15px] leading-relaxed text-muted-foreground">
              No vague "good condition" listings here. We use Goldmine standards so every spin is a
              confident one — media and sleeve graded separately.
            </p>
            <Link
              to="/condition-guide"
              className="label-mono mt-6 inline-block text-primary underline-sweep"
            >
              Read the full guide →
            </Link>
          </div>
          <div className="grid gap-4 sm:grid-cols-2">
            {gradeKeys.map((k) => (
              <div
                key={k}
                className="hover-lift flex gap-4 bg-card p-6 shadow-sleeve"
                style={{
                  backgroundColor:
                    grades[k].tone === "sage"
                      ? "var(--sage)"
                      : grades[k].tone === "tan"
                        ? "var(--tan)"
                        : grades[k].tone === "clay"
                          ? "var(--clay)"
                          : "var(--stone)",
                }}
              >
                <span
                  className={
                    grades[k].tone === "clay"
                      ? "font-display text-3xl text-primary-foreground"
                      : "font-display text-3xl text-ink"
                  }
                >
                  {k}
                </span>
                <div className={grades[k].tone === "clay" ? "text-primary-foreground" : "text-ink"}>
                  <p className="text-sm font-medium">{grades[k].name}</p>
                  <p className="mt-1 text-xs opacity-80">{grades[k].blurb}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Sellers */}
      <section className="bg-tan py-20">
        <div className="mx-auto max-w-7xl px-5 lg:px-8">
          <div className="flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
            <div>
              <p className="label-mono text-primary">Meet the crate diggers</p>
              <h2 className="mt-4 text-[clamp(2rem,4vw,3rem)] leading-tight text-tan-foreground">
                People behind the records.
              </h2>
            </div>
            <Link to="/sellers" className="label-mono text-primary underline-sweep">
              Join the community →
            </Link>
          </div>

          <div className="mt-10 grid gap-6 md:grid-cols-3">
            {sellers.map((s, i) => (
              <Link
                key={s.id}
                to="/sellers/$sellerId"
                params={{ sellerId: s.id }}
                className="hover-lift animate-rise bg-background p-6 shadow-sleeve"
                style={{ animationDelay: `${i * 80}ms` }}
              >
                <div className="flex items-start justify-between gap-4">
                  <div>
                    <h3 className="text-xl">{s.name}</h3>
                    <p className="mt-1 text-sm text-muted-foreground">
                      {s.city} · {s.sales.toLocaleString()} records sold
                    </p>
                  </div>
                  <span className="label-mono flex items-center gap-1">
                    <Star className="h-3 w-3 fill-primary text-primary" />
                    {s.rating.toFixed(1)}
                  </span>
                </div>
                <p className="label-mono mt-6 text-primary">{s.tags.join(" · ")}</p>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="bg-ink py-20 text-center text-ink-foreground">
        <div className="mx-auto max-w-2xl px-5">
          <GradeBadge grade="NM" size="lg" />
          <h2 className="mt-6 text-[clamp(2rem,4.5vw,3.25rem)] leading-tight">
            Your records deserve a good next home.
          </h2>
          <p className="mt-5 text-sm text-ink-muted">
            List a record in under three minutes. We handle the grading template, shipping labels,
            and payouts.
          </p>
          <Button asChild className="label-mono mt-8 h-11 rounded-sm px-6">
            <Link to="/signup">Start selling</Link>
          </Button>
        </div>
      </section>
    </>
  );
}
