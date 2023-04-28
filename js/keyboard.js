import layouts from './layouts.js';

export default class Keyboard {
  #parent = null; // где будет отображаться клавиатура

  #inputElement = null; // элемент в который с клавиатуры будет печататься текст

  #container = null; // где отрисовывается клавиатура и потом это добавляется в parent

  #layout = 'en'; // текущая раскладка

  #inputElementKeyDownBound = null; // обработчик события
  // keydown с привязанным this для элемента inputElement

  #inputElementKeyUpBound = null; // обработчик события
  // keyup с привязанным this для элемента inputElement

  #specialKeys = {};

  #ctrlKey = false;

  #altKey = false;

  #shiftKey = false;

  #metaKey = false;

  constructor(parent) {
    this.#parent = parent;
    this.#inputElementKeyDownBound = this.#inputElementKeyDown.bind(this); // гарантирует что this
    // будет указывать на экземпляр класса при down
    this.#inputElementKeyUpBound = this.#inputElementKeyUp.bind(this); // гарантирует что this
    // будет привязан на экземпляр класса при событие up

    const holdShiftKey = () => {
      this.#shiftKey = true;
      this.#refreshKeyLabels();
    };
    this.#addSpecialKey('ShiftLeft', holdShiftKey);
    this.#addSpecialKey('ShiftRight', holdShiftKey);

    const holdControlKey = () => {
      this.#ctrlKey = true;
    };
    this.#addSpecialKey('ControlLeft', holdControlKey);
    this.#addSpecialKey('ControlRight', holdControlKey);

    const holdAltKey = () => {
      this.#altKey = true;
    };
    this.#addSpecialKey('AltLeft', holdAltKey);
    this.#addSpecialKey('AltRight', holdAltKey);

    const holdMetaKey = () => {
      this.#metaKey = true;
    };
    this.#addSpecialKey('MetaLeft', holdMetaKey);
    this.#addSpecialKey('MetaRight', holdMetaKey);

    this.#addSpecialKey('Backspace', () => {
      this.#inputElement.dispatchEvent(new KeyboardEvent('down', { isTrusted: true, code: 'Backspace' }));
      const text = this.#inputElement.value;
      const selection = this.#inputElement.selectionStart;
      if (selection > 0) {
        this.#inputElement.value = `${text.slice(0, selection - 1) ?? ''}${text.slice(selection) ?? ''}`;
        this.#inputElement.focus();
        this.#inputElement.selectionEnd = selection - 1;
        this.#inputElement.selectionStart = selection - 1;
      }
      setTimeout(() => {
        this.#deActivateKey('Backspace');
      }, 100);
    });
    this.#addSpecialKey('ArrowDown', () => {
      const event = document.createEvent('Events');
      event.initEvent('keydown', true, true);
      event.which = 40;
      this.#inputElement.dispatchEvent(event);
    });
  }

  bind(inputElement) { // если уже был привязанный элемент
    this.#inputElement?.removeEventListener('keydown', this.#inputElementKeyDownBound); // то отвязываем обработчик события keydown
    this.#inputElement?.removeEventListener('keyup', this.#inputElementKeyUpBound); // товязываем keyup
    this.#inputElement = inputElement; // сохраняем ссылку на элемент и привязываем на обработчики
    this.#inputElement?.addEventListener('keydown', this.#inputElementKeyDownBound); // keydown
    this.#inputElement?.addEventListener('keyup', this.#inputElementKeyUpBound); // keyup
    this.#refreshModificatorKeys();
  }

  show() {
    if (this.#container) { // если уже была клавиатура,
      this.#container.remove(); // то ее удаляем
    }
    this.#container = document.createElement('div');
    this.#container.classList.add('keyboard-container');
    const engRows = layouts.en;
    const rows = layouts[this.#layout]; // подгружается из файла layouts.js
    this.#container.append(...rows.map((row, i) => { // отрисовывается разом
      const rowElement = document.createElement('div'); // строчки
      rowElement.classList.add('keyboard-row'); // класса
      rowElement.append(...row.map((key, j) => { // отрисовываются кнопки для каждой строки
        const keyElement = document.createElement('button');
        keyElement.classList.add('keyboard-key');
        keyElement.setAttribute('id', key.code ?? `Key${(engRows[i][j].key ?? engRows[i][j]).toUpperCase()}`);
        // key у объекта - берется он, если нет то просто key
        keyElement.addEventListener('click', () => this.#type(key)); // обрабатываем нажатие каждой клавиши
        return keyElement;
      }));
      return rowElement;
    }));
    this.#refreshKeyLabels();
    this.#parent.append(this.#container);
  }

  changeLayout(layout) {
    if (!layouts[layout]) {
      throw new Error(`ой-йо-ой нет лэйаута ${layout}`);
    }
    this.#layout = layout;
    this.#refreshKeyLabels();
  }

  #addSpecialKey(code, handler) {
    this.#specialKeys[code] = () => {
      this.#activateKey(code);
      handler();
    };
  }

  #type(key) { // функция которая печатает
    if (this.#specialKeys[key.code]) { // если специальная клавиша
      this.#specialKeys[key.code](); // то вызываем код связанный с этой специальной клавишей
      return;
    }
    // для всех остальных клавиш вызовется следующий код
    if (!this.#altKey && !this.#ctrlKey && !this.#metaKey) { // обработка клавиатурных сочетаний - их не печатает
      const keyToType = this.#shiftKey // зажат ли shift?
        ? (key.shift ?? key.key ?? key).toUpperCase() // если зажат берем клавишу - знаки у цифр, если просто буква приводит в upperCase
        : (key.key ?? key); // иначе если не зажат shift
      this.#inputElement.value += keyToType; // добавляем к тексту в инпут этот символ который надо напечатать
      const code = key.code ?? `Key${(key.key ?? key).toUpperCase()}`;
      this.#activateKey(code);
      setTimeout(() => {
        this.#deActivateKey(code);
      }, 100);
    }
    if (this.#shiftKey) { // если все-таки шифт зажат на виртуальной клавиатуре то мы его сбрасываем
      this.#shiftKey = false;
      this.#refreshKeyLabels(); // обновляются upper на lower case или наоборот
    }
    this.#altKey = false;
    this.#ctrlKey = false;
    this.#metaKey = false;
    Object.keys(this.#specialKeys).forEach((code) => {
      this.#deActivateKey(code); // убирает класс active у обоих кнопок
    });
  }

  // обработчики нажатий виртуальной клавиатуры
  #inputElementKeyDown(e) {
    this.#refreshModificatorKeys(e); // обновляет статусы служебных клавиш
    this.#activateKey(e.code); // активируем кнопку по коду - присваиваем класс active
    this.#refreshKeyLabels(); // перерисовывает лейблы с учетом статуса shift
  }

  #inputElementKeyUp(e) {
    this.#refreshModificatorKeys(e);
    this.#deActivateKey(e.code);
    this.#refreshKeyLabels();
  }

  #refreshModificatorKeys(e) {
    this.#ctrlKey = e?.ctrlKey ?? false; // считывает состояние был ли ctrl нажат
    this.#altKey = e?.altKey ?? false;
    this.#shiftKey = e?.shiftKey ?? false;
    this.#metaKey = e?.metaKey ?? false;
  }

  #activateKey(code) {
    this.#container?.querySelector(`#${code}`)?.classList?.add('active');
  }

  #deActivateKey(code) {
    this.#container?.querySelector(`#${code}`)?.classList?.remove('active');
  }

  #refreshKeyLabels() {
    const rowElements = [...this.#container?.querySelectorAll('.keyboard-row') ?? null];
    const rows = layouts[this.#layout]; // подгружается из файла layouts.js
    if (rowElements.length !== rows.length) {
      return;
    }
    rowElements.forEach((rowElement, i) => {
      const keyElements = rowElement.querySelectorAll('.keyboard-key');
      const keys = rows[i];
      for (let j = 0; j < keyElements.length; j += 1) {
        const keyElement = keyElements[j];
        const key = keys[j];
        keyElement.innerText = this.#shiftKey
          ? (key.shift ?? key.key ?? key).toUpperCase()
          : (key.key ?? key);
      }
    });
  }
}
