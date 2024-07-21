/* eslint-disable @typescript-eslint/no-explicit-any */
import { BooleanProperty, CannedProperty, PlayerFiringMode, WindowMode } from "../types";
import { PersistableState } from "./PersistableState";

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

  static load() {
    return super.load(new SettingsState()) as SettingsState;
  }

  save() {
    SettingsState.save(this);
  }
}
