import SettingsElement from './Settings.html';

export class Settings {
  constructor() {}

  async render () {
    return SettingsElement;
  }

  async after_render () {};
}
