import { createFileRoute, Link } from "@tanstack/react-router";
import { Button } from "@/components/ui/button";

export const Route = createFileRoute("/privacy")({
  head: () => ({
    meta: [
      { title: "Privacy Policy — Vinilo" },
      {
        name: "description",
        content: "How Vinilo collects, uses, and protects your personal information.",
      },
    ],
  }),
  component: Privacy,
});

function Privacy() {
  const sections = [
    {
      title: "Information we collect",
      body: "We collect information you provide directly, such as your name, email, shipping address, and listing details. We also collect usage data including pages visited, browser type, and device information to improve the marketplace experience.",
    },
    {
      title: "How we use your information",
      body: "Your data is used to process transactions, communicate order updates, verify seller identities, and personalize your browsing experience. We never sell your personal information to third parties.",
    },
    {
      title: "Data security",
      body: "All sensitive data is encrypted in transit and at rest. We follow industry-standard security practices, including regular access reviews, secure payment processing, and encrypted storage for personal details.",
    },
    {
      title: "Cookies and tracking",
      body: "Vinilo uses essential cookies to keep you signed in and remember your preferences. Analytics cookies help us understand how collectors use the site so we can improve search, filters, and listing quality.",
    },
    {
      title: "Third-party services",
      body: "We work with trusted payment processors, shipping providers, and image storage services. Each partner is required to handle your data in compliance with applicable privacy laws.",
    },
    {
      title: "Your rights",
      body: "You can request access to, correction of, or deletion of your personal data at any time by contacting our support team. Account deletion removes all personal data within 30 days.",
    },
    {
      title: "Data retention",
      body: "We retain transaction records for tax and legal compliance. Listing and account data is kept until you delete your account or request removal, unless a longer retention period is required by law.",
    },
    {
      title: "Contact us",
      body: "If you have questions about this policy, email privacy@vinilo.market or mail us at Vinilo Records Hub, 12 Crate Lane, Brooklyn, NY 11201.",
    },
  ];

  return (
    <div className="paper-grain">
      <section className="border-b border-border bg-background/80">
        <div className="mx-auto max-w-7xl px-5 py-10 lg:px-8">
          <p className="label-mono text-primary">Legal</p>
          <h1 className="mt-3 text-[clamp(2.25rem,5vw,3.5rem)] leading-[0.95]">
            Privacy <em className="text-primary">policy</em>
          </h1>
          <p className="mt-3 max-w-2xl text-[15px] leading-relaxed text-muted-foreground">
            Your privacy matters to us. This policy explains what data we collect, why we collect
            it, and how we protect it.
          </p>
          <p className="label-mono mt-4 text-muted-foreground">Last updated: August 25, 2026</p>
        </div>
      </section>

      <section className="bg-background py-16">
        <div className="mx-auto max-w-7xl px-5 lg:px-8">
          <div className="grid gap-6">
            {sections.map((s, i) => (
              <div
                key={s.title}
                className="animate-rise hover-lift border border-border bg-card p-6 shadow-sleeve"
                style={{ animationDelay: `${i * 60}ms` }}
              >
                <h2 className="font-display text-xl">{s.title}</h2>
                <p className="mt-2 text-[15px] leading-relaxed text-muted-foreground">{s.body}</p>
              </div>
            ))}
          </div>

          <div className="mt-12 text-center">
            <Button asChild className="label-mono h-11 rounded-sm px-6">
              <Link to="/">Back to Vinilo</Link>
            </Button>
          </div>
        </div>
      </section>
    </div>
  );
}
