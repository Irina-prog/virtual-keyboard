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

  const comments = document.createElement('p');
  comments.classList.add('instruction');
  comments.textContent = `чтобы переключить раскладку нажмите кнопку lang (Fn на Mac OS)`
  body.append(comments);

  const keyboard = new Keyboard(body);
  keyboard.bind(inputElement);
  inputElement.focus();
  keyboard.show();

  // на изменение языка раскладки отрисовать значение языка
  keyboard.onlayoutchange = (layout) => {
    languageElement.textContent = layout;
    sessionStorage.setItem('layout', layout);
  };
  // обращение к cвойству layout чтобы получить текущую раскладку
  languageElement.textContent = sessionStorage.getItem('layout') ?? keyboard.layout;
  keyboard.changeLayout(languageElement.textContent);

  
}

document.addEventListener('DOMContentLoaded', start);
