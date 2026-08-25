import { createFileRoute, Link } from "@tanstack/react-router";
import { Button } from "@/components/ui/button";

export const Route = createFileRoute("/terms")({
  head: () => ({
    meta: [
      { title: "Terms of Use — Vinilo" },
      {
        name: "description",
        content: "The terms and conditions for using the Vinilo marketplace.",
      },
    ],
  }),
  component: Terms,
});

function Terms() {
  const sections = [
    {
      title: "Acceptance of terms",
      body: "By accessing or using Vinilo, you agree to be bound by these terms. If you do not agree, please do not use the marketplace. We may update these terms from time to time, and continued use constitutes acceptance of any changes.",
    },
    {
      title: "Eligibility",
      body: "You must be at least 18 years old to use Vinilo. By creating an account, you represent that you are legally capable of entering into binding contracts and are responsible for all activity under your account.",
    },
    {
      title: "Buyer responsibilities",
      body: "Buyers must complete payment within 48 hours of purchase confirmation. Condition grades are provided by sellers; while we encourage accurate listings, Vinilo does not guarantee grading outcomes. Disputes should be opened within 7 days of delivery.",
    },
    {
      title: "Seller responsibilities",
      body: "Sellers must accurately describe condition, pressing, and defects. Shipping must occur within the promised timeframe. Attempting to redirect transactions off-platform or misrepresent items may result in suspension.",
    },
    {
      title: "Payments and fees",
      body: "Vinilo charges a commission on successful sales. Payment processing fees may apply depending on the payment method. Refunds are handled according to our buyer protection policy and are not guaranteed in all cases.",
    },
    {
      title: "Prohibited activities",
      body: "You may not use Vinilo for illegal transactions, fraud, harassment, or listing counterfeit items. Scraping, automated data collection, or interfering with marketplace operations is also prohibited.",
    },
    {
      title: "Intellectual property",
      body: "All content on Vinilo, including branding, design, and code, is owned by Vinilo or its licensors. User-generated content remains the property of the user, but by listing, you grant Vinilo a license to display and promote that content within the marketplace.",
    },
    {
      title: "Limitation of liability",
      body: "Vinilo is provided as-is without warranties of any kind. We are not liable for indirect, incidental, or consequential damages arising from use of the marketplace, including disputes between buyers and sellers.",
    },
    {
      title: "Termination",
      body: "We reserve the right to suspend or terminate accounts that violate these terms. Upon termination, your right to use the marketplace ceases immediately, and outstanding obligations remain enforceable.",
    },
    {
      title: "Contact",
      body: "Questions about these terms can be sent to legal@vinilo.market or mailed to Vinilo Records Hub, 12 Crate Lane, Brooklyn, NY 11201.",
    },
  ];

  return (
    <div className="paper-grain">
      <section className="border-b border-border bg-background/80">
        <div className="mx-auto max-w-7xl px-5 py-10 lg:px-8">
          <p className="label-mono text-primary">Legal</p>
          <h1 className="mt-3 text-[clamp(2.25rem,5vw,3.5rem)] leading-[0.95]">
            Terms of <em className="text-primary">use</em>
          </h1>
          <p className="mt-3 max-w-2xl text-[15px] leading-relaxed text-muted-foreground">
            Please read these terms carefully before using Vinilo. By using the marketplace, you
            agree to the following conditions.
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
