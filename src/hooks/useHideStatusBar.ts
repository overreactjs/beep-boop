import { useEffect } from "react";
import { StatusBar } from "@capacitor/status-bar";

export const useHideStatusBar = () => {
  useEffect(() => {
    StatusBar.hide().catch(() => {});
  }, []);
};
