import layouts from './layouts.js';

export default class Keyboard {
  #parent = null;

  #inputElement = null;

  #container = null;

  #layout = 'en';

  #inputElementKeyDownBound = null;

  #inputElementKeyUpBound = null;

  constructor(parent) {
    this.#parent = parent;
    this.#inputElementKeyDownBound = this.#inputElementKeyDown.bind(this);
    this.#inputElementKeyUpBound = this.#inputElementKeyUp.bind(this);
  }

  bind(inputElement) {
    this.#inputElement?.removeEventListener('keydown', this.#inputElementKeyDownBound);
    this.#inputElement?.removeEventListener('keyup', this.#inputElementKeyUpBound);
    this.#inputElement = inputElement;
    this.#inputElement?.addEventListener('keydown', this.#inputElementKeyDownBound);
    this.#inputElement?.addEventListener('keyup', this.#inputElementKeyUpBound);
  }

  show() {
    if (this.#container) {
      this.#container.remove();
    }
    this.#container = document.createElement('div');
    this.#container.classList.add('keyboard-container');
    const rows = layouts[this.#layout];
    this.#container.append(...rows.map((row) => {
      const rowElement = document.createElement('div');
      rowElement.classList.add('keyboard-row');
      rowElement.append(...row.map((key) => {
        const keyElement = document.createElement('button');
        keyElement.classList.add('keyboard-key');
        keyElement.innerText = key.key ?? key;
        keyElement.addEventListener('click', (e) => this.#type(key, e.shiftKey));
        return keyElement;
      }));
      return rowElement;
    }));
    this.#parent.append(this.#container);
  }

  changeLayout(layout) {
    if (!layouts[layout]) {
      throw new Error(`ой-йо-ой нет лэйаута ${layout}`);
    }
    this.#layout = layout;
    this.show();
  }

  #type(key, shiftKey) {
    const keyToType = shiftKey ? (key.shift ?? key.toUpperCase()) : (key.key ?? key);
    this.#inputElement.value += keyToType;
  }

  #inputElementKeyDown(e) {
    console.log('KeyDown');
    console.log(e);
  }

  #inputElementKeyUp(e) {
    console.log('KeyUp');
    console.log(e);
  }
}
