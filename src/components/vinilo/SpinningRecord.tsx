import { cn } from "@/lib/utils";

export function SpinningRecord({
  label = "Vinilo Selects",
  className,
  spin = true,
}: {
  label?: string;
  className?: string;
  spin?: boolean;
}) {
  return (
    <div className={cn("relative aspect-square", className)}>
      <div
        className={cn(
          "grooves absolute inset-0 rounded-full shadow-lift",
          spin && "animate-spin-record motion-reduce:animate-none",
        )}
        style={{ animationDuration: "9s" }}
      >
        <div className="absolute inset-[34%] rounded-full bg-primary" />
        <div className="absolute inset-[48.5%] rounded-full bg-background" />
      </div>
      <div className="pointer-events-none absolute inset-[34%] flex items-center justify-center">
        <span className="label-mono text-center text-[9px] leading-tight text-primary-foreground/90">
          {label}
        </span>
      </div>
      <div className="pointer-events-none absolute inset-0 rounded-full bg-gradient-to-tr from-transparent via-foreground/0 to-background/25" />
    </div>
  );
}
