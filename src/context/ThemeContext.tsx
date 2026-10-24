'use client';

import React, { createContext, useContext, useEffect, useState } from 'react';

export type Theme = 'purple' | 'green' | 'blue';

interface ThemeContextType {
  theme: Theme;
  setTheme: (theme: Theme) => void;
  accentColor: string;
}

const THEME_COLORS: Record<Theme, string> = {
  purple: '#a855f7',
  green: '#00f5c4',
  blue: '#00d2ff',
};

const ThemeContext = createContext<ThemeContextType>({
  theme: 'purple',
  setTheme: () => { },
  accentColor: '#a855f7',
});

export function ThemeProvider({ children }: { children: React.ReactNode }) {
  useEffect(() => {
    document.documentElement.setAttribute('data-theme', 'purple');
  }, []);

  return (
    <ThemeContext.Provider
      value={{
        theme: 'purple',
        setTheme: () => {},
        accentColor: '#a855f7',
      }}
    >
      {children}
    </ThemeContext.Provider>
  );
}

export function useTheme() {
  return useContext(ThemeContext);
}
