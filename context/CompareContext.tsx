"use client";
import { createContext, useContext, useState, ReactNode } from "react";

interface CompareContextType {
  compareList: string[];
  toggleCompare: (id: string) => void;
  isCompared: (id: string) => boolean;
}

const CompareContext = createContext<CompareContextType | undefined>(undefined);

export function CompareProvider({ children }: { children: ReactNode }) {
  const [compareList, setCompareList] = useState<string[]>([]);

  const toggleCompare = (id: string) => {
    setCompareList((prev) =>
      prev.includes(id) ? prev.filter((x) => x !== id) : [...prev, id]
    );
  };

  const isCompared = (id: string) => compareList.includes(id);

  return (
    <CompareContext.Provider value={{ compareList, toggleCompare, isCompared }}>
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
