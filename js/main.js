import Keyboard from './keyboard.js';

function start() {
  const inputElement = document.createElement('textarea');
  inputElement.classList.add('demo-input');
  inputElement.setAttribute('cols', 30);
  inputElement.setAttribute('rows', 10);
  const body = document.querySelector('body');
  body.append(inputElement);

  const languageElement = document.createElement('div');
  languageElement.classList.add('demo-language');
  body.append(languageElement);

  const keyboard = new Keyboard(body);
  keyboard.bind(inputElement);
  inputElement.focus();
  keyboard.show();

  // на изменение языка раскладки отрисовать значение языка
  keyboard.onlayoutchange = (layout) => {
    languageElement.textContent = layout;
  };
  // обращение к cвойству layout чтобы получить текущую раскладку
  languageElement.textContent = keyboard.layout;
}

document.addEventListener('DOMContentLoaded', start);
