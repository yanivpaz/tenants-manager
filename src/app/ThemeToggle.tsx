"use client";

import { useTheme } from "./ThemeProvider";
import { SunIcon, MoonIcon } from "lucide-react";

export function ThemeToggle() {
  const { theme, toggleTheme } = useTheme();

  return (
    <button 
      onClick={toggleTheme}
      className="p-2 rounded-full bg-white/20 dark:bg-gray-800/40 text-gray-800 dark:text-gray-200 backdrop-blur-md shadow-sm border border-white/10 dark:border-gray-700/30 transition-all duration-300 hover:scale-110"
      aria-label="Toggle theme"
    >
      <SunIcon className="h-5 w-5 block dark:hidden" />
      <MoonIcon className="h-5 w-5 hidden dark:block" />
    </button>
  );
} 