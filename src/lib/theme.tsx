"use client";

import { createContext, useContext, useEffect, useState } from "react";

type Theme = "dark" | "light";

interface ThemeContextValue {
  theme: Theme;
  toggleTheme: () => void;
}

const ThemeContext = createContext<ThemeContextValue>({
  theme: "dark",
  toggleTheme: () => {},
});

export function useTheme() {
  return useContext(ThemeContext);
}

export function ThemeProvider({ children }: { children: React.ReactNode }) {
  const [theme, setTheme] = useState<Theme>("dark");
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    const stored = localStorage.getItem("theme") as Theme | null;
    if (stored === "light" || stored === "dark") {
      setTheme(stored);
    }
    setMounted(true);
  }, []);

  useEffect(() => {
    if (!mounted) return;
    document.documentElement.setAttribute("data-theme", theme);
    localStorage.setItem("theme", theme);
  }, [theme, mounted]);

  const toggleTheme = () => {
    setTheme((prev) => (prev === "dark" ? "light" : "dark"));
  };

  return <ThemeContext.Provider value={{ theme, toggleTheme }}>{children}</ThemeContext.Provider>;
}

/**
 * Inline script to prevent flash of wrong theme.
 * Insert this in <head> before any CSS renders.
 */
export function ThemeScript() {
  const script = `
    (function() {
      try {
        var root = document.documentElement;
        var t = localStorage.getItem('theme');
        if (t === 'light') {
          root.setAttribute('data-theme', 'light');
        }

        var conn = navigator.connection || navigator.mozConnection || navigator.webkitConnection;
        var saveData = !!(conn && conn.saveData);
        var lowMemory = typeof navigator.deviceMemory === 'number' && navigator.deviceMemory <= 4;
        var reducedMotion =
          typeof window.matchMedia === 'function' &&
          window.matchMedia('(prefers-reduced-motion: reduce)').matches;

        if (saveData || lowMemory || reducedMotion) {
          root.setAttribute('data-performance', 'lite');
        } else {
          root.setAttribute('data-performance', 'full');
        }
      } catch (error) {
        document.documentElement.setAttribute('data-performance', 'lite');
      }
    })();
  `;
  return <script dangerouslySetInnerHTML={{ __html: script }} />;
}
