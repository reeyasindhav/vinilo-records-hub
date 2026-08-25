import { Link } from "@tanstack/react-router";
import { Menu, Search, ShoppingBasket, X } from "lucide-react";
import { useState } from "react";

import { Button } from "@/components/ui/button";
import { useVinilo } from "@/lib/store";
import { cn } from "@/lib/utils";

const nav = [
  { to: "/browse", label: "Browse records" },
  { to: "/how-it-works", label: "How it works" },
  { to: "/condition-guide", label: "Condition guide" },
  { to: "/sellers", label: "Our sellers" },
];

export function SiteHeader() {
  const { crate, user } = useVinilo();
  const [open, setOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 border-b border-border/70 bg-background/85 backdrop-blur-md">
      <div className="bg-ink py-2 overflow-hidden">
        <div className="flex w-max animate-marquee gap-12 motion-reduce:animate-none">
          {[0, 1].map((k) => (
            <div key={k} className="flex gap-12">
              {[
                "Free shipping on orders over $75",
                "Every record condition checked by a collector",
                "Goldmine grading standards",
                "12,400+ records listed",
              ].map((t) => (
                <span key={t} className="label-mono whitespace-nowrap text-ink-foreground/80">
                  {t}
                </span>
              ))}
            </div>
          ))}
        </div>
      </div>

      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between gap-6 px-5 lg:px-8">
        <Link to="/" className="font-display text-2xl leading-none tracking-tight">
          vinilo<span className="text-primary">.</span>
        </Link>

        <nav className="hidden items-center gap-7 md:flex">
          {nav.map((n) => (
            <Link
              key={n.to}
              to={n.to}
              className="text-sm text-muted-foreground underline-sweep transition-colors hover:text-foreground"
              activeProps={{ className: "text-foreground underline" }}
            >
              {n.label}
            </Link>
          ))}
        </nav>

        <div className="flex items-center gap-1.5">
          <Link
            to="/browse"
            aria-label="Search records"
            className="rounded-full p-2 text-foreground/70 transition-colors hover:text-primary"
          >
            <Search className="h-[18px] w-[18px]" />
          </Link>
          <Link
            to="/crate"
            aria-label="Your crate"
            className="relative rounded-full p-2 text-foreground/70 transition-colors hover:text-primary"
          >
            <ShoppingBasket className="h-[18px] w-[18px]" />
            {crate.length > 0 && (
              <span className="absolute -right-0.5 -top-0.5 flex h-4 min-w-4 items-center justify-center rounded-full bg-primary px-1 font-mono text-[10px] text-primary-foreground">
                {crate.length}
              </span>
            )}
          </Link>
          <Button
            asChild
            variant="outline"
            className="label-mono ml-1 hidden rounded-sm border-foreground/25 bg-transparent hover:bg-foreground hover:text-background sm:inline-flex"
          >
            <Link to={user ? "/dashboard" : "/login"}>{user ? "Dashboard" : "Sign in"}</Link>
          </Button>
          <button
            className="ml-1 rounded-full p-2 md:hidden"
            aria-label="Toggle menu"
            onClick={() => setOpen((o) => !o)}
          >
            {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
        </div>
      </div>

      <div
        className={cn(
          "grid overflow-hidden border-t border-border/60 transition-all duration-300 md:hidden",
          open ? "grid-rows-[1fr] opacity-100" : "grid-rows-[0fr] opacity-0",
        )}
      >
        <nav className="flex flex-col gap-1 px-5 py-3">
          {[
            ...nav,
            { to: user ? "/dashboard" : "/login", label: user ? "Dashboard" : "Sign in" },
          ].map((n) => (
            <Link
              key={n.label}
              to={n.to}
              onClick={() => setOpen(false)}
              className="py-2 text-sm text-muted-foreground"
              activeProps={{ className: "text-foreground font-medium" }}
            >
              {n.label}
            </Link>
          ))}
        </nav>
      </div>
    </header>
  );
}
