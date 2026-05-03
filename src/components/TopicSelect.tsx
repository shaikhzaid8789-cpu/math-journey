import { TOPICS, CLASS_META } from "@/lib/topics";
import { ChevronLeft } from "lucide-react";

export const TopicSelect = ({ classId, onSelect, onBack }: { classId: string; onSelect: (t: string) => void; onBack: () => void }) => {
  const meta = CLASS_META.find((c) => c.id === classId);
  const topics = TOPICS[classId] || [];
  return (
    <div className="min-h-screen px-5 sm:px-10 py-10 max-w-5xl mx-auto animate-fade-in">
      <button onClick={onBack} className="mono text-xs uppercase tracking-widest text-muted-foreground hover:text-foreground flex items-center gap-1 mb-10">
        <ChevronLeft className="w-4 h-4" /> Back
      </button>

      <div className="mb-10">
        <p className="mono text-xs text-muted-foreground tracking-[0.3em] uppercase mb-3">// {meta?.label} · Step 02</p>
        <h2 className="text-4xl sm:text-6xl font-extrabold tracking-tighter">Pick a topic</h2>
        <p className="text-muted-foreground mt-3">Each topic generates infinite practice questions.</p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
        {topics.map((t, i) => (
          <button
            key={t}
            onClick={() => onSelect(t)}
            className="group glass rounded-2xl p-5 text-left hover:bg-card hover:border-primary transition-all flex items-center justify-between"
          >
            <div>
              <p className="mono text-[10px] text-muted-foreground tracking-widest mb-2">{String(i + 1).padStart(2, "0")}</p>
              <p className="font-medium text-base leading-tight">{t}</p>
            </div>
            <span className="text-2xl text-muted-foreground group-hover:text-primary group-hover:translate-x-1 transition-all">→</span>
          </button>
        ))}
      </div>
    </div>
  );
};
