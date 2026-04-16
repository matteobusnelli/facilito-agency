import { useLocation } from "react-router-dom";
import { useEffect } from "react";
import { ArrowLeft } from "lucide-react";

const NotFound = () => {
  const location = useLocation();

  useEffect(() => {
    console.error("404:", location.pathname);
  }, [location.pathname]);

  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-hero bg-dot-grid text-hero-foreground px-6">
      <p className="text-primary text-sm font-semibold tracking-widest uppercase mb-4">404</p>
      <h1 className="text-4xl sm:text-5xl font-bold mb-4 text-center">Pagina non trovata</h1>
      <p className="text-white/50 mb-10 text-center max-w-sm">
        La pagina che stai cercando non esiste o è stata spostata.
      </p>
      <a
        href="/"
        className="inline-flex items-center gap-2 px-6 py-3 rounded-lg bg-primary text-primary-foreground font-semibold hover:bg-primary/90 transition-colors"
      >
        <ArrowLeft className="w-4 h-4" />
        Torna alla home
      </a>
    </div>
  );
};

export default NotFound;
