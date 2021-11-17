import HeaderElement from './Header.html';

export class Header {
  constructor() {}

  async render () {
    return HeaderElement;
  }

  async after_render () {};
}
