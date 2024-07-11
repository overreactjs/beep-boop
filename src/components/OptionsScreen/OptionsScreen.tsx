import { Box } from "@overreact/engine";
import { useAppState } from "../../hooks";
import { Screen } from "../Screen";
import { Options } from "./Options";
import { Accessibility } from "./Accessibility";

type OptionsState = 'options' | 'accessibility';

type OptionsScreenProps = {
  onBack: () => void;
};

export const OptionsScreen: React.FC<OptionsScreenProps> = (props) => {
  const { onBack } = props;
  const { state, go } = useAppState<OptionsState>('options');

  return (
    <Screen size={[256, 240]} scale="auto">
      <Box pos={[0, 0]} size={[256, 240]} color="black">
        {state === 'options' && (
          <Options onBack={onBack} onAccessibility={go('accessibility')} />
        )}
        {state === 'accessibility' && (
          <Accessibility onBack={go('options')} />
        )}
      </Box>
    </Screen>
  );
};
