import { useState } from "react";
import { Splash } from "@/components/Splash";
import { ClassSelect } from "@/components/ClassSelect";
import { TopicSelect } from "@/components/TopicSelect";
import { Quiz } from "@/components/Quiz";

type Screen = "splash" | "class" | "topic" | "quiz";

const Index = () => {
  const [screen, setScreen] = useState<Screen>("splash");
  const [classId, setClassId] = useState<string>("");
  const [topic, setTopic] = useState<string>("");

  return (
    <main className="min-h-screen bg-background text-foreground">
      <h1 className="sr-only">Math. — Primary School Math Learning Platform (Class 1–5)</h1>
      {screen === "splash" && <Splash onStart={() => setScreen("class")} />}
      {screen === "class" && (
        <ClassSelect
          onSelect={(id) => { setClassId(id); setScreen("topic"); }}
          onBack={() => setScreen("splash")}
        />
      )}
      {screen === "topic" && (
        <TopicSelect
          classId={classId}
          onSelect={(t) => { setTopic(t); setScreen("quiz"); }}
          onBack={() => setScreen("class")}
        />
      )}
      {screen === "quiz" && <Quiz topic={topic} onBack={() => setScreen("topic")} />}
    </main>
  );
};

export default Index;
