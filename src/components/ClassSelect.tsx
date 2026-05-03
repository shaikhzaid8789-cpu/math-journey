import { CLASS_META } from "@/lib/topics";
import { ChevronLeft } from "lucide-react";

export const ClassSelect = ({ onSelect, onBack }: { onSelect: (id: string) => void; onBack: () => void }) => {
  return (
    <div className="min-h-screen px-5 sm:px-10 py-10 max-w-5xl mx-auto animate-fade-in">
      <button onClick={onBack} className="mono text-xs uppercase tracking-widest text-muted-foreground hover:text-foreground flex items-center gap-1 mb-10">
        <ChevronLeft className="w-4 h-4" /> Back
      </button>

      <div className="mb-12">
        <p className="mono text-xs text-muted-foreground tracking-[0.3em] uppercase mb-3">// Step 01</p>
        <h2 className="text-4xl sm:text-6xl font-extrabold tracking-tighter">Choose your class</h2>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {CLASS_META.map((c, i) => (
          <button
            key={c.id}
            onClick={() => onSelect(c.id)}
            className="group glass rounded-3xl p-6 text-left hover:bg-card hover:border-primary transition-all duration-300 hover:-translate-y-1"
            style={{ animationDelay: `${i * 50}ms` }}
          >
            <div className="flex items-start justify-between mb-12">
              <span className="mono text-xs text-muted-foreground tracking-widest">CLASS</span>
              <span className="text-7xl font-extrabold tracking-tighter text-foreground group-hover:text-primary transition-colors">
                {c.emoji}
              </span>
            </div>
            <div className="flex items-end justify-between">
              <div>
                <p className="text-xl font-semibold">{c.label}</p>
                <p className="mono text-xs text-muted-foreground uppercase tracking-wider mt-1">{c.sub}</p>
              </div>
              <span className="mono text-xs text-primary opacity-0 group-hover:opacity-100 transition-opacity">→</span>
            </div>
          </button>
        ))}
      </div>
    </div>
  );
};
