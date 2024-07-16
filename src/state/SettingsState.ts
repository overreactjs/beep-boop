/* eslint-disable @typescript-eslint/no-explicit-any */
import { BooleanProperty, CannedProperty } from "../types";

export class SettingsState {

  showExplosionFlashes = new BooleanProperty(true);
  gameSpeed = new CannedProperty(1.0, [0.5, 0.6, 0.7, 0.8, 0.9, 1.0]);

  static load() {
    const settings = new SettingsState();
    const keys = Object.getOwnPropertyNames(settings);

    keys.forEach((key) => {
      const value = localStorage.getItem('setting_' + key);
      console.log(key, value);
      if (value !== null) {
        (settings as any)[key].current = JSON.parse(value);
      }
    });

    console.log(settings);

    return settings;
  }

  save() {
    const keys = Object.getOwnPropertyNames(this);

    keys.forEach((key) => {
      localStorage.setItem('setting_' + key, JSON.stringify((this as any)[key].current))
    });
  }
}
