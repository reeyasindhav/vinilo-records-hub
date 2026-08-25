import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowRight, ShoppingBasket, Trash2 } from "lucide-react";
import { toast } from "sonner";

import { Button } from "@/components/ui/button";
import { GradeBadge } from "@/components/vinilo/GradeBadge";
import { getRecord } from "@/data/vinilo";
import { useVinilo } from "@/lib/store";

export const Route = createFileRoute("/crate")({
  head: () => ({
    meta: [
      { title: "Your Crate — Vinilo" },
      { name: "description", content: "Review the records in your crate before checkout." },
    ],
  }),
  component: Crate,
});

function Crate() {
  const { crate, toggleCrate } = useVinilo();
  const items = crate.map((id) => getRecord(id)).filter(Boolean);
  const total = items.reduce((a, r) => a + (r?.price ?? 0), 0);

  return (
    <div className="paper-grain">
      <section className="border-b border-border bg-background/80">
        <div className="mx-auto max-w-7xl px-5 py-10 lg:px-8">
          <p className="label-mono text-primary">Your picks</p>
          <h1 className="mt-3 text-[clamp(2.25rem,5vw,3.5rem)] leading-[0.95]">
            Your <em className="text-primary">crate</em>
          </h1>
        </div>
      </section>

      <section className="bg-background py-12">
        <div className="mx-auto max-w-7xl px-5 lg:px-8">
          {items.length === 0 ? (
            <div className="py-20 text-center">
              <ShoppingBasket className="mx-auto h-10 w-10 text-muted-foreground" />
              <p className="mt-4 text-lg text-muted-foreground">Your crate is empty.</p>
              <Button asChild className="label-mono mt-6 h-11 rounded-sm px-6">
                <Link to="/browse">Start browsing</Link>
              </Button>
            </div>
          ) : (
            <div className="grid gap-8 lg:grid-cols-[1fr_320px]">
              <div className="space-y-4">
                {items.map((r) => (
                  <div key={r!.id} className="flex gap-5 border border-border p-4 hover-lift">
                    <Link
                      to="/records/$recordId"
                      params={{ recordId: r!.id }}
                      className="block overflow-hidden bg-muted"
                    >
                      <img
                        src={r!.image}
                        alt={r!.title}
                        className="h-24 w-24 object-cover sm:h-32 sm:w-32"
                      />
                    </Link>
                    <div className="flex-1 min-w-0">
                      <Link to="/records/$recordId" params={{ recordId: r!.id }}>
                        <h3 className="font-display text-xl underline-sweep">{r!.title}</h3>
                      </Link>
                      <p className="text-sm text-muted-foreground">
                        {r!.artist} · {r!.year}
                      </p>
                      <div className="mt-2 flex items-center gap-3">
                        <GradeBadge grade={r!.grade} />
                        <span className="label-mono text-primary">${r!.price}</span>
                      </div>
                    </div>
                    <button
                      onClick={() => {
                        toggleCrate(r!.id);
                        toast(`${r!.title} removed from crate`);
                      }}
                      className="self-start rounded-full p-2 text-muted-foreground transition-colors hover:text-destructive"
                    >
                      <Trash2 className="h-4 w-4" />
                    </button>
                  </div>
                ))}
              </div>
              <div className="border border-border bg-card p-6 shadow-sleeve h-fit">
                <h3 className="font-display text-2xl">Summary</h3>
                <div className="mt-4 space-y-2 text-sm">
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Items</span>
                    <span>{items.length}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Shipping</span>
                    <span>{total >= 75 ? "Free" : "$5.00"}</span>
                  </div>
                  <div className="mt-3 flex justify-between border-t border-border pt-3 text-lg">
                    <span className="font-medium">Total</span>
                    <span className="font-display text-primary">
                      ${(total + (total >= 75 ? 0 : 5)).toFixed(2)}
                    </span>
                  </div>
                </div>
                <Button asChild className="label-mono mt-6 h-11 w-full rounded-sm">
                  <Link to="/checkout">
                    Checkout <ArrowRight className="ml-2 h-4 w-4" />
                  </Link>
                </Button>
              </div>
            </div>
          )}
        </div>
      </section>
    </div>
  );
}
