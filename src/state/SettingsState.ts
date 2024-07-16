import { BooleanProperty, CannedProperty } from "../types";

export class SettingsState {

  showExplosionFlashes = new BooleanProperty(true);
  gameSpeed = new CannedProperty(1.0, [0.5, 0.6, 0.7, 0.8, 0.9, 1.0]);

  static load() {
    return new SettingsState();
  }

  save() {
    // persist to local storage.
  }
}
