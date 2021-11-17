import CategoryElement from './Category.html';

export class Category {
  constructor() {}

  async render () {
    return CategoryElement;
  }

  async after_render () {};
}
