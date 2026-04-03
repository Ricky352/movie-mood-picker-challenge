import { createContext, useCallback, useState } from "react";
import type { CustomMoodConfig } from "../types/customMood";

const STORAGE_KEY = "movie-mood-custom";

const load = (): CustomMoodConfig[] => {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    return raw ? JSON.parse(raw) : [];
  } catch {
    return [];
  }
};

interface CustomMoodsContextValue {
  customMoods: CustomMoodConfig[];
  addCustomMood: (mood: CustomMoodConfig) => void;
  deleteCustomMood: (id: string) => void;
}

const CustomMoodsContext = createContext<CustomMoodsContextValue | null>(null);

export const CustomMoodsProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const [customMoods, setCustomMoods] = useState<CustomMoodConfig[]>(load);

  const addCustomMood = useCallback((mood: CustomMoodConfig) => {
    setCustomMoods((prev) => {
      const next = [...prev, mood];
      localStorage.setItem(STORAGE_KEY, JSON.stringify(next));
      return next;
    });
  }, []);

  const deleteCustomMood = useCallback((id: string) => {
    setCustomMoods((prev) => {
      const next = prev.filter((m) => m.id !== id);
      localStorage.setItem(STORAGE_KEY, JSON.stringify(next));
      return next;
    });
  }, []);

  return (
    <CustomMoodsContext.Provider
      value={{ customMoods, addCustomMood, deleteCustomMood }}
    >
      {children}
    </CustomMoodsContext.Provider>
  );
};

export { CustomMoodsContext };
