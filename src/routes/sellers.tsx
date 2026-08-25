import { createFileRoute, Link } from "@tanstack/react-router";
import { Star } from "lucide-react";

import { sellers } from "@/data/vinilo";

export const Route = createFileRoute("/sellers")({
  head: () => ({
    meta: [
      { title: "Our Sellers — Vinilo" },
      {
        name: "description",
        content: "Meet the trusted vinyl collectors and shops selling on Vinilo.",
      },
    ],
  }),
  component: Sellers,
});

function Sellers() {
  return (
    <div className="paper-grain">
      <section className="border-b border-border bg-background/80">
        <div className="mx-auto max-w-7xl px-5 py-10 lg:px-8">
          <p className="label-mono text-primary">Meet the diggers</p>
          <h1 className="mt-3 text-[clamp(2.25rem,5vw,3.5rem)] leading-[0.95]">
            Our <em className="text-primary">sellers</em>
          </h1>
          <p className="mt-3 max-w-lg text-[15px] text-muted-foreground">
            Every seller on Vinilo is a collector first. Honest grades, careful packing, and fast
            replies.
          </p>
        </div>
      </section>

      <section className="bg-background py-16">
        <div className="mx-auto max-w-7xl px-5 lg:px-8">
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {sellers.map((s, i) => (
              <Link
                key={s.id}
                to="/sellers/:sellerId"
                params={{ sellerId: s.id }}
                className="hover-lift animate-rise bg-card p-6 shadow-sleeve"
                style={{ animationDelay: `${i * 80}ms` }}
              >
                <div className="flex items-center gap-4">
                  <img
                    src={s.avatar}
                    alt={s.name}
                    className="h-14 w-14 rounded-full object-cover"
                  />
                  <div className="min-w-0">
                    <h3 className="text-xl">{s.name}</h3>
                    <p className="label-mono text-muted-foreground">
                      {s.city} · {s.sales.toLocaleString()} sold
                    </p>
                  </div>
                </div>
                <p className="label-mono mt-4 text-primary">{(s.tags || []).join(" · ")}</p>
                <p className="mt-2 line-clamp-2 text-sm text-muted-foreground">{s.bio}</p>
                <div className="mt-4 flex items-center gap-1">
                  <Star className="h-4 w-4 fill-primary text-primary" />
                  <span className="text-sm font-medium">{s.rating.toFixed(1)}</span>
                  <span className="label-mono ml-2 text-muted-foreground">
                    Responds {s.responseTime}
                  </span>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
