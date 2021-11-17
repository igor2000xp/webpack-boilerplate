import HomeElement from './Home.html';

export class Home {
  constructor() {}

  async render () {
    return HomeElement;
  }

  async after_render () {};
}
