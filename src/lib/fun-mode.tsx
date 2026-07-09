"use client";

import { createContext, useContext, useEffect, useState } from "react";

// Fun mode shows the playful project mascots (the site's default look);
// switching it off swaps in professional category icons instead.
// Persisted like the theme preference.
interface FunModeContextValue {
  funMode: boolean;
  toggleFunMode: () => void;
}

const FunModeContext = createContext<FunModeContextValue>({
  funMode: true,
  toggleFunMode: () => {},
});

export function useFunMode() {
  return useContext(FunModeContext);
}

export function FunModeProvider({ children }: { children: React.ReactNode }) {
  const [funMode, setFunMode] = useState(true);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    // Client-only preference can't be known during SSR; hydrate the default
    // first, then sync from localStorage in an effect.
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setFunMode(localStorage.getItem("funMode") !== "off");
    setMounted(true);
  }, []);

  useEffect(() => {
    if (!mounted) return;
    localStorage.setItem("funMode", funMode ? "on" : "off");
  }, [funMode, mounted]);

  const toggleFunMode = () => setFunMode((prev) => !prev);

  return (
    <FunModeContext.Provider value={{ funMode, toggleFunMode }}>{children}</FunModeContext.Provider>
  );
}
