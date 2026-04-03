import { useContext } from "react";
import { CustomMoodsContext } from "../context/CustomMoodsContext";

export const useCustomMoods = () => {
  const ctx = useContext(CustomMoodsContext);
  if (!ctx)
    throw new Error("useCustomMoods must be used inside CustomMoodsProvider");
  return ctx;
};
