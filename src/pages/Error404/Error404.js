import Error404Element from './Error404.html';

export class Error404 {
  constructor() {}

  async render () {
    return Error404Element;
  }

  async after_render () {};
}
