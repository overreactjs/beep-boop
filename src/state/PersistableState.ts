/* eslint-disable @typescript-eslint/no-explicit-any */
export class PersistableState {

  static load(settings: object) {
    const keys = Object.getOwnPropertyNames(settings);

    keys.forEach((key) => {
      const value = localStorage.getItem('setting_' + key);
      if (value !== null) {
        (settings as any)[key].current = JSON.parse(value);
      }
    });

    return settings;
  }

  static save(settings: object) {
    const keys = Object.getOwnPropertyNames(settings);

    keys.forEach((key) => {
      localStorage.setItem('setting_' + key, JSON.stringify((settings as any)[key].current))
    });
  }
}
