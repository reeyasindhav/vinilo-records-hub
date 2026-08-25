import { createFileRoute } from "@tanstack/react-router";

import { grades, type Grade } from "@/data/vinilo";

export const Route = createFileRoute("/condition-guide")({
  head: () => ({
    meta: [
      { title: "Condition Guide — Vinilo" },
      {
        name: "description",
        content: "Learn Vinilo's Goldmine-based grading standards for media and sleeve condition.",
      },
    ],
  }),
  component: ConditionGuide,
});

function ConditionGuide() {
  const gradeKeys: Grade[] = ["M", "NM", "VG+", "VG", "G+"];

  return (
    <div className="paper-grain">
      <section className="border-b border-border bg-background/80">
        <div className="mx-auto max-w-7xl px-5 py-10 lg:px-8">
          <p className="label-mono text-primary">Grading standards</p>
          <h1 className="mt-3 text-[clamp(2.25rem,5vw,3.5rem)] leading-[0.95]">
            Condition <em className="text-primary">guide</em>
          </h1>
          <p className="mt-3 max-w-2xl text-[15px] leading-relaxed text-muted-foreground">
            We use Goldmine standards so every buyer knows exactly what they're getting. Media and
            sleeve are graded separately, and every listing includes playback notes.
          </p>
        </div>
      </section>

      <section className="bg-background py-16">
        <div className="mx-auto max-w-7xl px-5 lg:px-8">
          <div className="grid gap-6">
            {gradeKeys.map((k, i) => (
              <div
                key={k}
                className="animate-rise hover-lift grid gap-4 border border-border p-6 sm:grid-cols-[120px_1fr]"
                style={{ animationDelay: `${i * 80}ms` }}
              >
                <div>
                  <span className="font-display text-4xl">{k}</span>
                  <p className="label-mono mt-1 text-muted-foreground">{grades[k].name}</p>
                </div>
                <div>
                  <p className="text-[15px] leading-relaxed">{grades[k].blurb}</p>
                  <div className="mt-4 flex flex-wrap gap-2">
                    {["Media grade", "Sleeve grade", "Playback notes", "Photos"].map((t) => (
                      <span
                        key={t}
                        className="label-mono rounded-sm border border-border px-2 py-1 text-muted-foreground"
                      >
                        {t}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div className="mt-16 rounded-sm border border-border bg-card p-8 shadow-sleeve">
            <h2 className="font-display text-2xl">Buyer protections</h2>
            <ul className="mt-4 list-disc space-y-2 pl-5 text-[15px] text-muted-foreground">
              <li>
                If the record arrives in worse condition than described, we cover the return
                shipping.
              </li>
              <li>
                Every listing includes at least three photos: front, back, and a close-up of the
                media.
              </li>
              <li>Sellers must reply within 48 hours or their account is flagged.</li>
            </ul>
          </div>
        </div>
      </section>
    </div>
  );
}
