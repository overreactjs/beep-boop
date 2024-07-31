/* eslint-disable @typescript-eslint/no-explicit-any */
import { VariableProperty } from "@overreact/engine";
import { BooleanProperty, CannedProperty, PlayerFiringMode, WindowMode } from "../types";
import { PersistableState } from "./PersistableState";

type GamepadAssignment = 0 | 1 | 2 | 3 | null;

export class SettingsState extends PersistableState {

  // Audio
  muteSounds = new BooleanProperty(false);
  muteMusic = new BooleanProperty(false);

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

  // Controls
  keyboardAssign = new VariableProperty<[boolean, boolean]>([true, false]);
  gamepadAssign = new VariableProperty<[GamepadAssignment, GamepadAssignment]>([null, null]);

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
