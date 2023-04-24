import layouts from './layouts.js';

export default class Keyboard {
  #parent = null;

  #inputElement = null;

  #container = null;

  #layout = 'en';

  constructor(parent) {
    this.#parent = parent;
  }

  bind(inputElement) {
    this.#inputElement = inputElement;
  }

  show() {
    this.#container = document.createElement('div');
    this.#container.classList.add('keyboard-container');
  }

  changeLayout(layout) {
    if (!layouts[layout]) {
      throw new Error(`ой-йо-ой нет лэйаута ${layout}`);
    }
    this.#layout = layout;
    this.show();
  }
}
