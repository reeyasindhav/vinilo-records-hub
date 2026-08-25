import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowLeft, ArrowRight, Heart, ShoppingBasket, Star } from "lucide-react";
import { toast } from "sonner";

import { Button } from "@/components/ui/button";
import { GradeBadge } from "@/components/vinilo/GradeBadge";
import { getRecord, getSeller, reviews } from "@/data/vinilo";
import { useVinilo } from "@/lib/store";
import { cn } from "@/lib/utils";

export const Route = createFileRoute("/records/$recordId")({
  head: ({ loaderData }) => ({
    meta: [
      { title: `${loaderData?.record.title} by ${loaderData?.record.artist} — Vinilo` },
      {
        name: "description",
        content: `${loaderData?.record.notes || "View this vinyl record listing on Vinilo."}`,
      },
    ],
  }),
  loader: ({ params }) => {
    const record = getRecord(params.recordId);
    if (!record) throw new Error("Record not found");
    const seller = getSeller(record.sellerId);
    const recordReviews = reviews.filter((r) => r.seller === record.sellerId);
    return { record, seller, recordReviews };
  },
  component: RecordDetail,
});

function RecordDetail() {
  const { record, seller, recordReviews } = Route.useLoaderData();
  const { crate, toggleCrate, wishlist, toggleWishlist } = useVinilo();
  const inCrate = crate.includes(record.id);
  const saved = wishlist.includes(record.id);

  return (
    <div className="paper-grain">
      <section className="border-b border-border bg-background/80">
        <div className="mx-auto max-w-7xl px-5 py-6 lg:px-8">
          <Button
            asChild
            variant="ghost"
            className="label-mono h-auto px-0 text-muted-foreground hover:text-primary"
          >
            <Link to="/browse">
              <ArrowLeft className="mr-2 h-4 w-4" />
              Back to browse
            </Link>
          </Button>
        </div>
      </section>

      <section className="bg-background py-12">
        <div className="mx-auto max-w-7xl px-5 lg:px-8">
          <div className="grid gap-10 lg:grid-cols-[1fr_1.2fr]">
            <div className="overflow-hidden bg-muted shadow-sleeve">
              <img
                src={record.image}
                alt={`${record.title} by ${record.artist}`}
                className="aspect-square w-full object-cover"
              />
            </div>

            <div className="animate-rise">
              <div className="flex flex-wrap items-center gap-3">
                <GradeBadge grade={record.grade} />
                <span className="label-mono text-muted-foreground">
                  Media: {record.grade} · Sleeve: {record.sleeveGrade}
                </span>
              </div>

              <h1 className="mt-4 text-[clamp(2rem,4vw,3rem)] leading-[0.95]">{record.title}</h1>
              <p className="mt-2 text-xl text-muted-foreground">
                {record.artist} · {record.year}
              </p>

              <div className="mt-6 grid gap-4 sm:grid-cols-3">
                <div className="border border-border p-4">
                  <p className="label-mono text-muted-foreground">Pressing</p>
                  <p className="mt-1 text-sm">{record.pressing}</p>
                </div>
                <div className="border border-border p-4">
                  <p className="label-mono text-muted-foreground">Label</p>
                  <p className="mt-1 text-sm">{record.label}</p>
                </div>
                <div className="border border-border p-4">
                  <p className="label-mono text-muted-foreground">Genre</p>
                  <p className="mt-1 text-sm">{record.genre}</p>
                </div>
              </div>

              <p className="mt-6 text-[15px] leading-relaxed text-muted-foreground">
                {record.notes}
              </p>

              <div className="mt-8 flex flex-wrap items-center gap-4">
                <span className="font-display text-4xl text-primary">${record.price}</span>
                <Button
                  onClick={() => {
                    toggleCrate(record.id);
                    toast(inCrate ? "Removed from crate" : `${record.title} added to crate`);
                  }}
                  className="label-mono h-11 rounded-sm px-6"
                >
                  <ShoppingBasket className="mr-2 h-4 w-4" />
                  {inCrate ? "In crate" : "Add to crate"}
                </Button>
                <button
                  onClick={() => {
                    toggleWishlist(record.id);
                    toast(saved ? "Removed from wishlist" : "Saved to wishlist");
                  }}
                  className="rounded-full p-2 text-muted-foreground transition-colors hover:text-primary"
                >
                  <Heart className={cn("h-5 w-5", saved && "fill-primary text-primary")} />
                </button>
              </div>

              {seller && (
                <Link
                  to="/sellers/$sellerId"
                  params={{ sellerId: seller.id }}
                  className="mt-8 flex items-center gap-4 border-t border-border pt-6 hover-lift"
                >
                  <img
                    src={seller.avatar}
                    alt={seller.name}
                    className="h-12 w-12 rounded-full object-cover"
                  />
                  <div className="min-w-0">
                    <p className="font-display text-lg">{seller.name}</p>
                    <p className="label-mono text-muted-foreground">
                      {seller.city} · <Star className="inline h-3 w-3 fill-primary text-primary" />{" "}
                      {seller.rating.toFixed(1)}
                    </p>
                  </div>
                  <ArrowRight className="ml-auto h-4 w-4 text-muted-foreground" />
                </Link>
              )}
            </div>
          </div>

          <div className="mt-16 grid gap-12 lg:grid-cols-2">
            <div>
              <h2 className="font-display text-2xl">Tracklist</h2>
              <div className="mt-4 space-y-2">
                {record.tracks.map((t) => (
                  <div key={t.n} className="flex items-center gap-4 border-b border-border py-2">
                    <span className="label-mono w-8 text-muted-foreground">{t.n}</span>
                    <span className="flex-1 text-sm">{t.title}</span>
                    <span className="label-mono text-muted-foreground">{t.length}</span>
                  </div>
                ))}
              </div>
            </div>

            <div>
              <h2 className="font-display text-2xl">Seller reviews</h2>
              <div className="mt-4 space-y-4">
                {recordReviews.length === 0 && (
                  <p className="text-sm text-muted-foreground">No reviews for this seller yet.</p>
                )}
                {recordReviews.map((rv) => (
                  <div key={rv.id} className="border-b border-border pb-4">
                    <div className="flex items-center gap-2">
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
      </section>
    </div>
  );
}
