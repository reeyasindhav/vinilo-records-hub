import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowLeft, Star } from "lucide-react";

import { Button } from "@/components/ui/button";
import { RecordCard } from "@/components/vinilo/RecordCard";
import { getSeller, recordsBySeller, reviews, salesTrend } from "@/data/vinilo";
import { useVinilo } from "@/lib/store";
import {
  Area,
  AreaChart,
  CartesianGrid,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";

export const Route = createFileRoute("/sellers/$sellerId")({
  head: ({ loaderData }) => ({
    meta: [
      { title: `${loaderData?.seller.name} — Vinilo` },
      {
        name: "description",
        content: loaderData?.seller.bio.slice(0, 160),
      },
    ],
  }),
  loader: ({ params }) => {
    const seller = getSeller(params.sellerId);
    if (!seller) throw new Error("Seller not found");
    const sellerRecords = recordsBySeller(seller.id);
    const sellerReviews = reviews.filter((r) => r.seller === seller.id);
    return { seller, sellerRecords, sellerReviews };
  },
  component: SellerProfile,
});

function SellerProfile() {
  const { seller, sellerRecords, sellerReviews } = Route.useLoaderData();
  const { wishlist, toggleWishlist } = useVinilo();

  return (
    <div className="paper-grain">
      <section className="border-b border-border bg-background/80">
        <div className="mx-auto max-w-7xl px-5 py-6 lg:px-8">
          <Button
            asChild
            variant="ghost"
            className="label-mono h-auto px-0 text-muted-foreground hover:text-primary"
          >
            <Link to="/sellers">
              <ArrowLeft className="mr-2 h-4 w-4" />
              All sellers
            </Link>
          </Button>
        </div>
      </section>

      <section className="bg-background">
        <div className="mx-auto max-w-7xl px-5 py-12 lg:px-8">
          <div className="grid gap-8 lg:grid-cols-[1.5fr_1fr]">
            <div className="animate-rise">
              <div className="flex items-center gap-4">
                <img
                  src={seller.avatar}
                  alt={seller.name}
                  className="h-20 w-20 rounded-full object-cover"
                />
                <div>
                  <h1 className="text-[clamp(2rem,4vw,3rem)] leading-[0.95]">{seller.name}</h1>
                  <p className="label-mono text-muted-foreground">
                    {seller.city} · Selling since {seller.since}
                  </p>
                </div>
              </div>
              <p className="mt-6 text-[15px] leading-relaxed text-muted-foreground">{seller.bio}</p>
              <div className="mt-6 flex flex-wrap gap-3">
                {seller.tags.map((t) => (
                  <span key={t} className="label-mono rounded-sm border border-border px-3 py-1.5">
                    {t}
                  </span>
                ))}
              </div>

              <h2 className="mt-12 font-display text-2xl">Listings</h2>
              <p className="label-mono mt-1 text-muted-foreground">
                {sellerRecords.length} records listed
              </p>
              <div className="mt-6 grid gap-x-6 gap-y-12 sm:grid-cols-2">
                {sellerRecords.map((r, i) => (
                  <RecordCard key={r.id} record={r} index={i} />
                ))}
              </div>
              {sellerRecords.length === 0 && (
                <p className="mt-6 text-sm text-muted-foreground">
                  No active listings from this seller right now.
                </p>
              )}
            </div>

            <div className="space-y-8">
              <div className="border border-border p-6">
                <h3 className="label-mono text-muted-foreground">Stats</h3>
                <div className="mt-4 grid grid-cols-2 gap-4">
                  <div>
                    <p className="font-display text-3xl">{seller.sales.toLocaleString()}</p>
                    <p className="label-mono text-muted-foreground">Records sold</p>
                  </div>
                  <div>
                    <p className="font-display text-3xl">{seller.rating.toFixed(1)}</p>
                    <p className="label-mono text-muted-foreground">Average rating</p>
                  </div>
                  <div>
                    <p className="font-display text-3xl">{seller.responseTime}</p>
                    <p className="label-mono text-muted-foreground">Response time</p>
                  </div>
                  <div>
                    <p className="font-display text-3xl">{seller.shipsFrom}</p>
                    <p className="label-mono text-muted-foreground">Ships from</p>
                  </div>
                </div>
              </div>

              <div className="border border-border p-6">
                <h3 className="label-mono text-muted-foreground">Sales trend</h3>
                <div className="mt-4 h-48 w-full">
                  <ResponsiveContainer width="100%" height="100%">
                    <AreaChart data={salesTrend}>
                      <defs>
                        <linearGradient id="salesGrad" x1="0" y1="0" x2="0" y2="1">
                          <stop offset="5%" stopColor="var(--color-primary)" stopOpacity={0.4} />
                          <stop offset="95%" stopColor="var(--color-primary)" stopOpacity={0} />
                        </linearGradient>
                      </defs>
                      <CartesianGrid strokeDasharray="3 3" stroke="var(--color-border)" />
                      <XAxis
                        dataKey="month"
                        tick={{ fontSize: 12, fill: "var(--color-muted-foreground)" }}
                      />
                      <YAxis tick={{ fontSize: 12, fill: "var(--color-muted-foreground)" }} />
                      <Tooltip
                        contentStyle={{
                          backgroundColor: "var(--color-card)",
                          border: "1px solid var(--color-border)",
                          borderRadius: "var(--radius)",
                        }}
                      />
                      <Area
                        type="monotone"
                        dataKey="sales"
                        stroke="var(--color-primary)"
                        fill="url(#salesGrad)"
                      />
                    </AreaChart>
                  </ResponsiveContainer>
                </div>
              </div>

              <div className="border border-border p-6">
                <h3 className="label-mono text-muted-foreground">Reviews</h3>
                <div className="mt-4 space-y-4">
                  {sellerReviews.length === 0 && (
                    <p className="text-sm text-muted-foreground">No reviews yet.</p>
                  )}
                  {sellerReviews.map((rv) => (
                    <div key={rv.id} className="border-b border-border pb-4 last:border-0">
                      <div className="flex items-center justify-between">
                        <span className="text-sm font-medium">{rv.author}</span>
                        <span className="label-mono text-muted-foreground">{rv.date}</span>
                      </div>
                      <div className="mt-1 flex gap-0.5">
                        {Array.from({ length: rv.rating }).map((_, i) => (
                          <Star key={i} className="h-3 w-3 fill-primary text-primary" />
                        ))}
                      </div>
                      <p className="mt-2 text-sm text-muted-foreground">{rv.text}</p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
