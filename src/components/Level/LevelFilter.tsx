import { useSync } from "@overreact/engine";
import { useSettings } from "../../hooks";

type LevelFilterProps = {
  children: React.ReactNode;
};

export const LevelFilter: React.FC<LevelFilterProps> = ({ children }) => {
  const settings = useSettings();
  const filter = useSync(() => settings.highContrast.current ? 'grayscale' : '');

  return <div className={filter}>{children}</div>;
};
