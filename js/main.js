import Keyboard from './keyboard.js';

function start() {
  const keyboard = new Keyboard(document.querySelector('body'));
  const inputElement = document.querySelector('#demo-input');
  keyboard.bind(inputElement);
  inputElement.focus();
  keyboard.show();
}

document.addEventListener('DOMContentLoaded', start);
