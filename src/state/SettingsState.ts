/* eslint-disable @typescript-eslint/no-explicit-any */
import { BooleanProperty, CannedProperty } from "../types";
import { PersistableState } from "./PersistableState";

export class SettingsState extends PersistableState {

  showExplosionFlashes = new BooleanProperty(true);
  gameSpeed = new CannedProperty(1.0, [0.5, 0.6, 0.7, 0.8, 0.9, 1.0]);
  enemySpeed = new CannedProperty(1.0, [0.7, 1.0]);
  invincibility = new CannedProperty(0, [0, 1, 2, 3]);
  infiniteLives = new CannedProperty(0, [0, 1, 2, 3]);
  highContrast = new BooleanProperty(false);

  static load() {
    return super.load(new SettingsState()) as SettingsState;
  }

  save() {
    SettingsState.save(this);
  }
}
