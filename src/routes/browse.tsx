import { createFileRoute, Link } from "@tanstack/react-router";
import { SlidersHorizontal } from "lucide-react";
import { useState } from "react";

import { Button } from "@/components/ui/button";
import { GradeBadge } from "@/components/vinilo/GradeBadge";
import { RecordCard } from "@/components/vinilo/RecordCard";
import { genres, records, type Genre } from "@/data/vinilo";

export const Route = createFileRoute("/browse")({
  head: () => ({
    meta: [
      { title: "Browse Records — Vinilo" },
      {
        name: "description",
        content:
          "Browse thousands of vinyl records with transparent condition grades and trusted sellers.",
      },
    ],
  }),
  component: Browse,
});

function Browse() {
  const [selectedGenre, setSelectedGenre] = useState<Genre | "All">("All");
  const [sortBy, setSortBy] = useState<"featured" | "price-asc" | "price-desc" | "newest">(
    "featured",
  );

  const filtered = records
    .filter((r) => selectedGenre === "All" || r.genre === selectedGenre)
    .sort((a, b) => {
      if (sortBy === "price-asc") return a.price - b.price;
      if (sortBy === "price-desc") return b.price - a.price;
      return 0;
    });

  return (
    <div className="paper-grain">
      <section className="border-b border-border bg-background/80">
        <div className="mx-auto max-w-7xl px-5 py-10 lg:px-8">
          <p className="label-mono text-primary">Browse the crates</p>
          <h1 className="mt-3 text-[clamp(2.25rem,5vw,3.5rem)] leading-[0.95]">
            All <em className="text-primary">listings</em>
          </h1>
          <p className="mt-3 max-w-lg text-[15px] text-muted-foreground">
            Every record is graded by a collector, photographed in natural light, and packed with
            care.
          </p>
        </div>
      </section>

      <section className="border-b border-border bg-background/60">
        <div className="mx-auto max-w-7xl px-5 py-6 lg:px-8">
          <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
            <div className="flex flex-wrap gap-2">
              {["All", ...genres].map((g) => (
                <button
                  key={g}
                  onClick={() => setSelectedGenre(g as Genre | "All")}
                  className={[
                    "label-mono rounded-sm border px-3 py-2 transition-all",
                    selectedGenre === g
                      ? "border-primary bg-primary text-primary-foreground"
                      : "border-border bg-background hover:border-primary hover:text-primary",
                  ].join(" ")}
                >
                  {g}
                </button>
              ))}
            </div>
            <div className="flex items-center gap-2">
              <SlidersHorizontal className="h-4 w-4 text-muted-foreground" />
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value as typeof sortBy)}
                className="label-mono rounded-sm border border-border bg-background px-3 py-2 text-foreground"
              >
                <option value="featured">Featured</option>
                <option value="price-asc">Price: Low to High</option>
                <option value="price-desc">Price: High to Low</option>
              </select>
            </div>
          </div>
        </div>
      </section>

      <section className="bg-background py-12">
        <div className="mx-auto max-w-7xl px-5 lg:px-8">
          <p className="label-mono mb-6 text-muted-foreground">
            {filtered.length} {filtered.length === 1 ? "record" : "records"}
          </p>
          <div className="grid gap-x-6 gap-y-12 sm:grid-cols-2 lg:grid-cols-3">
            {filtered.map((r, i) => (
              <RecordCard key={r.id} record={r} index={i} />
            ))}
          </div>
          {filtered.length === 0 && (
            <div className="py-20 text-center">
              <p className="text-lg text-muted-foreground">No records found in this genre.</p>
              <Button
                asChild
                variant="outline"
                className="label-mono mt-4 rounded-sm border-foreground/25 bg-transparent hover:bg-foreground hover:text-background"
              >
                <Link to="/browse">Clear filters</Link>
              </Button>
            </div>
          )}
        </div>
      </section>
    </div>
  );
}
