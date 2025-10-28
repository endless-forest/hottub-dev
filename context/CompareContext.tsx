"use client";

import { createContext, useContext, useState, useEffect, ReactNode } from "react";

interface CompareContextType {
  compareList: string[];
  toggleCompare: (id: string) => void;
  isCompared: (id: string) => boolean;
  clearAll: () => void;
}

const CompareContext = createContext<CompareContextType | undefined>(undefined);

export function CompareProvider({ children }: { children: ReactNode }) {
  const [compareList, setCompareList] = useState<string[]>([]);

  // ✅ Load from localStorage on mount
  useEffect(() => {
    const saved = localStorage.getItem("compareList");
    if (saved) {
      try {
        setCompareList(JSON.parse(saved));
      } catch {
        localStorage.removeItem("compareList");
      }
    }
  }, []);

  // ✅ Save to localStorage whenever compareList changes
  useEffect(() => {
    localStorage.setItem("compareList", JSON.stringify(compareList));
  }, [compareList]);

  const toggleCompare = (id: string) => {
    setCompareList((prev) =>
      prev.includes(id) ? prev.filter((x) => x !== id) : [...prev, id]
    );
  };

  const isCompared = (id: string) => compareList.includes(id);

  const clearAll = () => setCompareList([]);

  return (
    <CompareContext.Provider value={{ compareList, toggleCompare, isCompared, clearAll }}>
      {children}
    </CompareContext.Provider>
  );
}

export function useCompare() {
  const context = useContext(CompareContext);
  if (!context) {
    throw new Error("useCompare must be used within CompareProvider");
  }
  return context;
}
