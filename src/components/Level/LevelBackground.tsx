import { Box, useFlash } from "@overreact/engine";

type LevelBackgroundProps = {
  offset: number;
  color: string
}

export const LevelBackground: React.FC<LevelBackgroundProps> = ({ offset, color }) => {
  const visible = useFlash(200);
  return <Box pos={[0, offset]} size={[256, 200]} visible={visible} color={color} className="mix-blend-screen" />
};
