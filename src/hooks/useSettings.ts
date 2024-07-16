import { useContext } from "react";
import { SettingsContext } from "../App";

export const useSettings = () => {
  return useContext(SettingsContext);
};
