import { Button } from "@/components/ui/button";

export const Splash = ({ onStart }: { onStart: () => void }) => {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center px-6 dot-grid relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-background/80 to-background pointer-events-none" />
      <div className="relative z-10 flex flex-col items-center gap-12 animate-fade-in">
        <div className="flex items-center gap-2">
          <span className="w-2 h-2 rounded-full bg-primary animate-pulse-dot" />
          <span className="w-2 h-2 rounded-full bg-primary animate-pulse-dot" style={{ animationDelay: "0.2s" }} />
          <span className="w-2 h-2 rounded-full bg-primary animate-pulse-dot" style={{ animationDelay: "0.4s" }} />
        </div>

        <h1 className="text-7xl sm:text-9xl font-extrabold tracking-tighter text-foreground flex items-baseline">
          <span className="animate-scale-in">Math</span>
          <span className="text-primary animate-blink">.</span>
        </h1>

        <p className="mono text-xs sm:text-sm text-muted-foreground tracking-[0.3em] uppercase">
          Primary School · Class 1 — 5
        </p>

        <Button
          size="lg"
          onClick={onStart}
          className="mono uppercase tracking-widest text-xs h-14 px-10 rounded-full bg-primary text-primary-foreground hover:bg-primary/90 hover:scale-105 transition-all"
        >
          Start Journey →
        </Button>
      </div>

      <div className="absolute bottom-6 mono text-[10px] text-muted-foreground tracking-[0.4em] uppercase">
        v1.0 · Infinite Quizzes
      </div>
    </div>
  );
};
