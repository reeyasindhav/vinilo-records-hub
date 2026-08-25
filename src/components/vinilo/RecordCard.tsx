import { Link } from "@tanstack/react-router";
import { Heart } from "lucide-react";
import { toast } from "sonner";

import { GradeBadge } from "./GradeBadge";
import type { Record_ } from "@/data/vinilo";
import { useVinilo } from "@/lib/store";
import { cn } from "@/lib/utils";

export function RecordCard({
  record,
  onDark = false,
  index = 0,
}: {
  record: Record_;
  onDark?: boolean;
  index?: number;
}) {
  const { crate, toggleCrate, wishlist, toggleWishlist } = useVinilo();
  const inCrate = crate.includes(record.id);
  const saved = wishlist.includes(record.id);

  return (
    <article
      className="group animate-rise"
      style={{ animationDelay: `${Math.min(index, 8) * 60}ms` }}
    >
      <Link
        to="/records/$recordId"
        params={{ recordId: record.id }}
        className="block overflow-hidden"
      >
        <div className="relative aspect-square overflow-hidden bg-muted">
          <img
            src={record.image}
            alt={`${record.title} by ${record.artist}`}
            loading="lazy"
            className="h-full w-full object-cover transition-transform duration-700 ease-out group-hover:scale-[1.06]"
          />
          <span className="absolute left-3 top-3">
            <GradeBadge grade={record.grade} />
          </span>
          <div
            className={cn(
              "grooves absolute -right-16 bottom-3 aspect-square w-28 rounded-full opacity-0 transition-all duration-500 ease-out",
              "group-hover:right-3 group-hover:opacity-100 group-hover:animate-spin-record motion-reduce:group-hover:animate-none",
            )}
          >
            <div className="absolute inset-[42%] rounded-full bg-primary" />
          </div>
        </div>
      </Link>

      <div
        className={cn(
          "flex items-start justify-between gap-3 border-b pt-3 pb-2",
          onDark ? "border-ink-border" : "border-border",
        )}
      >
        <div className="min-w-0">
          <Link to="/records/$recordId" params={{ recordId: record.id }}>
            <h3
              className={cn(
                "truncate text-xl leading-snug underline-sweep inline-block",
                onDark ? "text-ink-foreground" : "text-foreground",
              )}
            >
              {record.title}
            </h3>
          </Link>
          <p className={cn("mt-0.5 text-sm", onDark ? "text-ink-muted" : "text-muted-foreground")}>
            {record.artist} · {record.year}
          </p>
        </div>
        <button
          aria-label={saved ? "Remove from wishlist" : "Save to wishlist"}
          onClick={() => {
            toggleWishlist(record.id);
            toast(saved ? "Removed from wishlist" : "Saved to wishlist");
          }}
          className={cn(
            "shrink-0 rounded-full p-1.5 transition-colors",
            onDark
              ? "text-ink-muted hover:text-primary"
              : "text-muted-foreground hover:text-primary",
          )}
        >
          <Heart className={cn("h-4 w-4", saved && "fill-primary text-primary")} />
        </button>
      </div>

      <div className="flex items-center justify-between pt-2">
        <span className={cn("label-mono", onDark ? "text-tan" : "text-primary")}>
          ${record.price}
        </span>
        <button
          onClick={() => {
            toggleCrate(record.id);
            toast(inCrate ? "Removed from crate" : `${record.title} added to crate`);
          }}
          className={cn(
            "label-mono transition-colors",
            onDark
              ? "text-ink-muted hover:text-ink-foreground"
              : "text-muted-foreground hover:text-foreground",
          )}
        >
          {inCrate ? "In crate" : "Add to crate"}
        </button>
      </div>
    </article>
  );
}
