import { createRoot } from "react-dom/client";
import App from "./App.tsx";
import "./index.css";
import { loadExternalSnippets } from "./lib/load-snippets";

createRoot(document.getElementById("root")!).render(<App />);

// Inject custom meta tags (public/meta-tags.html) and ad scripts (public/ads.html)
loadExternalSnippets();
