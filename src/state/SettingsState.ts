import { GamepadButtonName, KeyboardKeyName, VariableProperty } from "@overreact/engine";
import { BooleanProperty, CannedProperty, GamepadAssignment, HurryUpMode, InputBindingsProperty, NumericalProperty, PlayerFiringMode, WindowMode } from "../types";
import { PersistableState } from "./PersistableState";
import { GAMEPAD_BUTTON_MAP, KEYBOARD_MAP } from "../components/Player/constants";

export class SettingsState extends PersistableState {

  // Audio
  muteSounds = new BooleanProperty(false);
  volumeSounds = new NumericalProperty(0.5, 0.1, 1.0, 0.1);
  muteMusic = new BooleanProperty(false);
  volumeMusic = new NumericalProperty(0.5, 0.1, 1.0, 0.1);

  // Video
  windowMode = new CannedProperty<WindowMode>('windowed', ['windowed', 'fullscreen']);
  crtFilter = new BooleanProperty(false);
  showFrameRate = new BooleanProperty(false);

  // Accessibility
  showPlayerIndicators = new BooleanProperty(false);
  showExplosionFlashes = new BooleanProperty(true);
  gameSpeed = new CannedProperty(1.0, [0.5, 0.6, 0.7, 0.8, 0.9, 1.0]);
  enemySpeed = new CannedProperty(1.0, [0.7, 1.0]);
  invincibility = new CannedProperty(0, [0, 1, 2, 3]);
  infiniteLives = new CannedProperty(0, [0, 1, 2, 3]);
  highContrast = new BooleanProperty(false);
  dyslexiaFont = new BooleanProperty(false);
  firingMode = new CannedProperty<PlayerFiringMode>('manual', ['manual', 'continuous', 'automatic']);
  hurryUpMode = new CannedProperty<HurryUpMode>('normal', ['normal', 'noGlitch', 'off']);

  // Keyboard
  keyboardAssign = new VariableProperty<[boolean, boolean]>([true, false]);
  keyBindings = new InputBindingsProperty<KeyboardKeyName>(KEYBOARD_MAP);

  // Gamepad
  gamepadAssign = new VariableProperty<[GamepadAssignment, GamepadAssignment]>([null, null]);
  gamepadAnalogStick = new BooleanProperty(true);
  gamepadRumble = new BooleanProperty(true);
  buttonBindings = new InputBindingsProperty<GamepadButtonName>(GAMEPAD_BUTTON_MAP);

  constructor() {
    super();
    this.setupListeners();
  }

  static load() {
    return super.load(new SettingsState()) as SettingsState;
  }

  save() {
    SettingsState.save(this);
  }

  /**
   * Attach listeners to some of the settings properties, so that we can update other settings
   * accordingly, such as when two settings are mutually exclusive.
   */
  setupListeners() {
    // When the dyselxia font is enabled, disable the CRT filter.
    this.dyslexiaFont.listen((value) => {
      if (value.current) {
        this.crtFilter.current = false;
      }
    });

    // When the CRT filter is enabled, disable the dyslexia font.
    this.crtFilter.listen((value) => {
      if (value.current) {
        this.dyslexiaFont.current = false;
      }
    });
  }
}
