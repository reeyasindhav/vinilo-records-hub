import { grades, type Grade } from "@/data/vinilo";
import { cn } from "@/lib/utils";

const toneClass: Record<string, string> = {
  sage: "bg-sage text-ink",
  tan: "bg-tan text-tan-foreground",
  stone: "bg-stone text-ink",
  clay: "bg-clay text-primary-foreground",
};

export function GradeBadge({
  grade,
  size = "sm",
  className,
}: {
  grade: Grade;
  size?: "sm" | "lg";
  className?: string;
}) {
  const g = grades[grade];
  return (
    <span
      title={`${g.name} — ${g.blurb}`}
      className={cn(
        "label-mono inline-flex items-center rounded-sm font-medium",
        toneClass[g.tone],
        size === "sm" ? "px-2 py-[3px] text-[10px]" : "px-3 py-1.5 text-xs",
        className,
      )}
    >
      {grade}
    </span>
  );
}
