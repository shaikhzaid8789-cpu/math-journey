import { Link } from "react-router-dom";

export const Footer = () => {
  return (
    <footer className="w-full py-6 px-6 border-t border-border/40 mt-auto">
      <div className="max-w-5xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-2 mono text-[10px] uppercase tracking-[0.3em] text-muted-foreground">
        <span>© {new Date().getFullYear()} Math.</span>
        <Link
          to="/privacy"
          className="hover:text-foreground transition-colors"
        >
          Privacy Policy
        </Link>
      </div>
    </footer>
  );
};
