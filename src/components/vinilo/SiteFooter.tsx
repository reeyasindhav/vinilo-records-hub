import { Link } from "@tanstack/react-router";

const cols = [
  {
    title: "Marketplace",
    links: [
      { to: "/browse", label: "Browse records" },
      { to: "/sellers", label: "Our sellers" },
      { to: "/crate", label: "Your crate" },
    ],
  },
  {
    title: "Collectors",
    links: [
      { to: "/condition-guide", label: "Condition guide" },
      { to: "/how-it-works", label: "How it works" },
      { to: "/dashboard", label: "Your dashboard" },
    ],
  },
];

export function SiteFooter() {
  return (
    <footer className="bg-ink text-ink-foreground">
      <div className="mx-auto max-w-7xl px-5 py-14 lg:px-8">
        <div className="grid gap-10 md:grid-cols-[1.4fr_1fr_1fr]">
          <div>
            <p className="font-display text-3xl leading-none">
              vinilo<span className="text-primary">.</span>
            </p>
            <p className="mt-4 max-w-xs text-sm text-ink-muted">
              A collector-run marketplace for records that deserve an honest grade and a good next
              home.
            </p>
          </div>
          {cols.map((c) => (
            <div key={c.title}>
              <p className="label-mono text-tan">{c.title}</p>
              <ul className="mt-4 space-y-2.5">
                {c.links.map((l) => (
                  <li key={l.to}>
                    <Link
                      to={l.to}
                      className="text-sm text-ink-muted underline-sweep transition-colors hover:text-ink-foreground"
                    >
                      {l.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
        <div className="mt-12 flex flex-col gap-3 border-t border-ink-border pt-6 sm:flex-row sm:items-center sm:justify-between">
          <p className="label-mono text-ink-muted">Made for the long play</p>
          <p className="label-mono text-ink-muted">© 2026 Vinilo</p>
        </div>
      </div>
    </footer>
  );
}
