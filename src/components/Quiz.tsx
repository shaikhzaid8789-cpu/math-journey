import { useEffect, useRef, useState } from "react";
import { ChevronLeft, Check, X } from "lucide-react";
import { generateQuestion, type Question } from "@/lib/quiz";
import { cn } from "@/lib/utils";

const TIME_PER_Q = 60;

export const Quiz = ({ topic, onBack }: { topic: string; onBack: () => void }) => {
  const historyRef = useRef<Set<string>>(new Set());
  const [question, setQuestion] = useState<Question>(() => generateQuestion(topic, historyRef.current));
  const [selected, setSelected] = useState<string | null>(null);
  const [feedback, setFeedback] = useState<"correct" | "wrong" | null>(null);
  const [timeLeft, setTimeLeft] = useState(TIME_PER_Q);
  const [score, setScore] = useState({ correct: 0, total: 0 });
  const [streak, setStreak] = useState(0);

  const next = () => {
    setQuestion(generateQuestion(topic, historyRef.current));
    setSelected(null);
    setFeedback(null);
    setTimeLeft(TIME_PER_Q);
  };

  const speak = (text: string) => {
    try {
      if (typeof window === "undefined" || !("speechSynthesis" in window)) return;
      window.speechSynthesis.cancel();
      const u = new SpeechSynthesisUtterance(text);
      u.rate = 1.05;
      u.pitch = 1.1;
      u.volume = 1;
      u.lang = "en-US";
      window.speechSynthesis.speak(u);
    } catch {
      // ignore
    }
  };

  // timer
  useEffect(() => {
    if (feedback) return;
    if (timeLeft <= 0) {
      setFeedback("wrong");
      setStreak(0);
      setScore((s) => ({ correct: s.correct, total: s.total + 1 }));
      speak("Good try");
      const t = setTimeout(next, 250);
      return () => clearTimeout(t);
    }
    const id = setTimeout(() => setTimeLeft((t) => t - 1), 1000);
    return () => clearTimeout(id);
  }, [timeLeft, feedback]);

  const choose = (opt: string) => {
    if (feedback) return;
    const correct = opt === question.answer;
    setSelected(opt);
    setFeedback(correct ? "correct" : "wrong");
    setScore((s) => ({ correct: s.correct + (correct ? 1 : 0), total: s.total + 1 }));
    setStreak((st) => (correct ? st + 1 : 0));
    speak(correct ? "Good" : "Good try");
    setTimeout(next, 250);
  };

  const pct = (timeLeft / TIME_PER_Q) * 100;

  return (
    <div className="min-h-screen px-5 sm:px-10 py-8 max-w-3xl mx-auto animate-fade-in">
      {/* Top bar */}
      <div className="flex items-center justify-between mb-6">
        <button onClick={onBack} className="mono text-xs uppercase tracking-widest text-muted-foreground hover:text-foreground flex items-center gap-1">
          <ChevronLeft className="w-4 h-4" /> Exit
        </button>
        <div className="flex items-center gap-4 mono text-xs">
          <span className="text-muted-foreground">SCORE <span className="text-foreground font-bold">{score.correct}/{score.total}</span></span>
          {streak >= 2 && <span className="text-primary">🔥 {streak}</span>}
        </div>
      </div>

      {/* Topic */}
      <p className="mono text-[10px] text-muted-foreground tracking-[0.3em] uppercase mb-6">// {topic}</p>

      {/* Timer */}
      <div className="mb-8">
        <div className="flex items-baseline justify-between mb-2">
          <span className="mono text-xs text-muted-foreground tracking-widest">TIME LEFT</span>
          <span className={cn("mono text-2xl font-bold tabular-nums", timeLeft <= 10 ? "text-destructive" : "text-foreground")}>
            {String(timeLeft).padStart(2, "0")}s
          </span>
        </div>
        <div className="h-1 bg-secondary rounded-full overflow-hidden">
          <div
            className={cn("h-full transition-all duration-1000 ease-linear", timeLeft <= 10 ? "bg-destructive" : "bg-primary")}
            style={{ width: `${pct}%` }}
          />
        </div>
      </div>

      {/* Question card */}
      <div
        key={question.q}
        className={cn(
          "glass rounded-3xl p-6 sm:p-10 mb-6 animate-scale-in",
          feedback === "wrong" && "animate-shake border-destructive",
          feedback === "correct" && "border-primary"
        )}
      >
        {question.visual && (
          <div className="text-center text-4xl sm:text-5xl mb-6 whitespace-pre-line leading-relaxed">{question.visual}</div>
        )}
        <h3 className="text-2xl sm:text-3xl font-bold tracking-tight text-center">{question.q}</h3>
      </div>

      {/* Options */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
        {question.options.map((opt, i) => {
          const isSelected = selected === opt;
          const isAnswer = opt === question.answer;
          const showCorrect = feedback && isAnswer;
          const showWrong = feedback === "wrong" && isSelected;
          return (
            <button
              key={opt + i}
              onClick={() => choose(opt)}
              disabled={!!feedback}
              className={cn(
                "glass rounded-2xl p-5 text-left flex items-center justify-between transition-all hover:border-primary hover:bg-card disabled:cursor-not-allowed",
                showCorrect && "border-primary bg-primary/10",
                showWrong && "border-destructive bg-destructive/10"
              )}
            >
              <div className="flex items-center gap-3">
                <span className="mono text-xs text-muted-foreground w-6">{String.fromCharCode(65 + i)}</span>
                <span className="font-medium text-lg">{opt}</span>
              </div>
              {showCorrect && <Check className="w-5 h-5 text-primary" />}
              {showWrong && <X className="w-5 h-5 text-destructive" />}
            </button>
          );
        })}
      </div>

      {feedback && (
        <p className={cn("mono text-center text-xs uppercase tracking-widest mt-6", feedback === "correct" ? "text-primary" : "text-destructive")}>
          {feedback === "correct" ? "Correct" : `Answer: ${question.answer}`}
        </p>
      )}
    </div>
  );
};
