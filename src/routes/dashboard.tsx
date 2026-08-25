import { createFileRoute, Link } from "@tanstack/react-router";
import { LogOut, TrendingUp } from "lucide-react";
import { useState } from "react";

import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { orders, listings, salesTrend } from "@/data/vinilo";
import { useVinilo } from "@/lib/store";

export const Route = createFileRoute("/dashboard")({
  head: () => ({
    meta: [
      { title: "Dashboard — Vinilo" },
      { name: "description", content: "Manage your orders, listings, and seller stats." },
    ],
  }),
  component: Dashboard,
});

function Dashboard() {
  const { user, hydrated, signOut } = useVinilo();
  const [open, setOpen] = useState(false);

  if (!hydrated || !user) {
    return (
      <div className="paper-grain flex min-h-[calc(100vh-8rem)] items-center justify-center px-5">
        <div className="animate-rise text-center">
          <p className="label-mono text-primary">Access required</p>
          <h1 className="mt-3 text-[clamp(2rem,4vw,3rem)] leading-[0.95]">
            Sign in to view your dashboard
          </h1>
          <p className="mt-3 text-sm text-muted-foreground">
            Manage your orders, listings, and seller stats.
          </p>
          <Button asChild className="label-mono mt-8 h-11 rounded-sm px-6">
            <Link to="/login">Sign in</Link>
          </Button>
        </div>
      </div>
    );
  }

  const liveListings = listings.filter((l) => l.status === "Live").length;
  const totalViews = listings.reduce((a, b) => a + b.views, 0);
  const totalOffers = listings.reduce((a, b) => a + b.offers, 0);

  return (
    <div className="paper-grain">
      <section className="border-b border-border bg-background/80">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-5 py-6 lg:px-8">
          <div>
            <p className="label-mono text-primary">Your space</p>
            <h1 className="mt-1 text-[clamp(1.75rem,4vw,2.5rem)] leading-[0.95]">
              Welcome back, {user?.name}
            </h1>
          </div>
          <Dialog open={open} onOpenChange={setOpen}>
            <DialogTrigger asChild>
              <Button
                variant="outline"
                className="label-mono h-9 rounded-sm border-foreground/25 bg-transparent hover:bg-foreground hover:text-background"
              >
                <LogOut className="mr-2 h-4 w-4" />
                Sign out
              </Button>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>Sign out</DialogTitle>
                <DialogDescription>
                  Are you sure you want to sign out? You can always sign back in later.
                </DialogDescription>
              </DialogHeader>
              <DialogFooter>
                <Button
                  variant="outline"
                  onClick={() => setOpen(false)}
                  className="label-mono h-9 rounded-sm border-foreground/25 bg-transparent hover:bg-foreground hover:text-background"
                >
                  Cancel
                </Button>
                <Button
                  onClick={() => {
                    signOut();
                    setOpen(false);
                  }}
                  className="label-mono h-9 rounded-sm"
                >
                  Sign out
                </Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>
        </div>
      </section>

      <section className="bg-background py-12">
        <div className="mx-auto max-w-7xl px-5 lg:px-8">
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            <Card className="border border-border p-6 shadow-sleeve">
              <p className="label-mono text-muted-foreground">Active listings</p>
              <p className="mt-2 font-display text-4xl">{liveListings}</p>
              <p className="label-mono mt-1 text-muted-foreground">of {listings.length} total</p>
            </Card>
            <Card className="border border-border p-6 shadow-sleeve">
              <p className="label-mono text-muted-foreground">Total views</p>
              <p className="mt-2 font-display text-4xl">{totalViews.toLocaleString()}</p>
              <p className="label-mono mt-1 text-muted-foreground">across all listings</p>
            </Card>
            <Card className="border border-border p-6 shadow-sleeve">
              <p className="label-mono text-muted-foreground">Offers received</p>
              <p className="mt-2 font-display text-4xl">{totalOffers}</p>
              <p className="label-mono mt-1 text-muted-foreground">pending review</p>
            </Card>
            <Card className="border border-border p-6 shadow-sleeve">
              <p className="label-mono text-muted-foreground">Avg. response</p>
              <p className="mt-2 font-display text-4xl">&lt;2h</p>
              <p className="label-mono mt-1 text-muted-foreground">response time</p>
            </Card>
          </div>

          <div className="mt-12 grid gap-8 lg:grid-cols-2">
            <div>
              <h2 className="font-display text-2xl">Recent orders</h2>
              <div className="mt-4 space-y-3">
                {orders.map((o) => (
                  <Link
                    key={o.id}
                    to="/records/$recordId"
                    params={{ recordId: (o.record || "").toLowerCase().replace(/\s+/g, "-") }}
                    className="flex items-center justify-between border border-border p-4 hover-lift"
                  >
                    <div className="min-w-0">
                      <p className="font-display text-lg">{o.record}</p>
                      <p className="label-mono text-muted-foreground">
                        {o.seller} · {o.date}
                      </p>
                    </div>
                    <div className="text-right">
                      <p className="label-mono text-primary">${o.price}</p>
                      <p className="label-mono text-muted-foreground">{o.status}</p>
                    </div>
                  </Link>
                ))}
              </div>
            </div>

            <div>
              <h2 className="font-display text-2xl">Your listings</h2>
              <div className="mt-4 space-y-3">
                {listings.map((l) => (
                  <div
                    key={l.id}
                    className="flex items-center justify-between border border-border p-4"
                  >
                    <div className="min-w-0">
                      <p className="font-display text-lg">{l.record}</p>
                      <p className="label-mono text-muted-foreground">
                        {l.id} · {l.grade} · ${l.price}
                      </p>
                    </div>
                    <div className="text-right">
                      <p className="label-mono text-primary">{l.status}</p>
                      <p className="label-mono text-muted-foreground">
                        {l.views} views · {l.offers} offers
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          <div className="mt-12">
            <h2 className="font-display text-2xl">Sales trend</h2>
            <div className="mt-4 h-64 w-full border border-border bg-card p-4">
              <TrendingUp className="mb-4 h-6 w-6 text-primary" />
              <div className="h-48 w-full">
                <svg viewBox="0 0 300 120" className="h-full w-full">
                  <polyline
                    fill="none"
                    stroke="var(--color-primary)"
                    strokeWidth="2"
                    points={salesTrend
                      .map((d, i, arr) => {
                        const x = (i / (arr.length - 1)) * 280 + 10;
                        const y = 110 - (d.sales / 16) * 100;
                        return `${x},${y}`;
                      })
                      .join(" ")}
                  />
                  {salesTrend.map((d, i, arr) => {
                    const x = (i / (arr.length - 1)) * 280 + 10;
                    const y = 110 - (d.sales / 16) * 100;
                    return (
                      <g key={d.month}>
                        <circle cx={x} cy={y} r="3" fill="var(--color-primary)" />
                        <text
                          x={x}
                          y={118}
                          textAnchor="middle"
                          className="text-[10px]"
                          fill="var(--color-muted-foreground)"
                        >
                          {d.month}
                        </text>
                      </g>
                    );
                  })}
                </svg>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
