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

  #specialKeys = {}; // сюда будут добавлены обработчики
  // специальных клавиш типа backSpace, Shift, etc

  // статусы клавиш:
  #ctrlKey = false;

  #altKey = false;

  #shiftKey = false;

  #metaKey = false;

  #capsKey = false;

  constructor(parent) { // в конструктор передается элемент
    // где будет отображаться виртуальная клавиатура
    this.#parent = parent;
    this.#inputElementKeyDownBound = this.#inputElementKeyDown.bind(this); // гарантирует что this
    // будет указывать на экземпляр класса при down
    this.#inputElementKeyUpBound = this.#inputElementKeyUp.bind(this); // гарантирует что this
    // будет привязан на экземпляр класса при событие up

    const holdShiftKey = () => { // обработка нажатий шифта на виртуальной клаве
      this.#shiftKey = !this.#shiftKey; // статус меняем на противоположный
      this.#refreshKeyLabels(); // обновляем кнопочки
      if (!this.#shiftKey) { // если сняли шифт
        this.#deActivateKey('ShiftLeft'); // снимаем выделение с обоих шифтов на виртуальной клаве
        this.#deActivateKey('ShiftRight');
      }
    };

    // обработка обоих шифтов
    this.#addSpecialKey('ShiftLeft', holdShiftKey);
    this.#addSpecialKey('ShiftRight', holdShiftKey);

    // обработка control
    const holdControlKey = () => {
      this.#ctrlKey = !this.#ctrlKey;
      if (!this.#ctrlKey) { // если сняли control
        this.#deActivateKey('ControlLeft'); // снимаем выделение с обоих control на виртуальной клаве
        this.#deActivateKey('ControlRight');
      }
    };
    this.#addSpecialKey('ControlLeft', holdControlKey);
    this.#addSpecialKey('ControlRight', holdControlKey);

    // обработка alt (option на Мac OS)
    const holdAltKey = () => {
      this.#altKey = !this.#altKey;
      if (!this.#altKey) { // если сняли control
        this.#deActivateKey('AltLeft'); // снимаем выделение с обоих alt на виртуальной клаве
        this.#deActivateKey('AltRight');
      }
    };
    this.#addSpecialKey('AltLeft', holdAltKey);
    this.#addSpecialKey('AltRight', holdAltKey);

    // обработка metakey (command на Mac OS)
    const holdMetaKey = () => {
      this.#metaKey = !this.#metaKey;
      if (!this.#metaKey) { // если сняли metaKey
        this.#deActivateKey('MetaLeft'); // снимаем выделение с metaKey на виртуальной клаве
        this.#deActivateKey('MetaRight');
      }
    };
    this.#addSpecialKey('MetaLeft', holdMetaKey);
    this.#addSpecialKey('MetaRight', holdMetaKey);

    // обработка backspace
    this.#addSpecialKey('Backspace', () => { // добавляется  в объект специальных клавиш
      const text = this.#inputElement.value; // сохраняется весь текст из инпута в переменную
      const selection = this.#inputElement.selectionStart; // определяем позицию курсора
      if (selection > 0) { // если позиция не в самом начале
        // формируем текст без предыдущего символа
        this.#inputElement.value = `${text.slice(0, selection - 1) ?? ''}${text.slice(selection) ?? ''}`;
        //  и смещаем курсор на одну позицию влево
        this.#inputElement.selectionEnd = selection - 1;
        // чтобы не было выделенного текста в selectionStart и
        // selectionEnd должны хранить одно и тоже значение
        this.#inputElement.selectionStart = selection - 1;
      }
    }, true);

    // обработка стрелок
    this.#addSpecialKey('ArrowLeft', () => {
      this.#inputElement.selectionStart -= 1; // смещаем влево курсор
      // и чтобы не было выделения текста присваиваем такое же значение
      this.#inputElement.selectionEnd = this.#inputElement.selectionStart;
    }, true);
    this.#addSpecialKey('ArrowRight', () => {
      this.#inputElement.selectionStart += 1; // смещаем вправо
      this.#inputElement.selectionEnd = this.#inputElement.selectionStart;
    }, true);
    this.#addSpecialKey('ArrowDown', () => {
      const nextLineLength = this.#getNextLineLength();
      if (nextLineLength >= 0) {
        // расчитываем и перемещаем курсор так чтобы он был в той же позиции но на новой строке либо
        // в конце строки если перемещаемся на более короткую строку
        this.#inputElement.selectionStart
        += (this.#getCurrentLineLength() - this.#getCursorPositionFromBeginOfLine())
        + Math.min(nextLineLength, this.#getCursorPositionFromBeginOfLine()) + 1;
        this.#inputElement.selectionEnd = this.#inputElement.selectionStart; // подгоняем,
        // чтобы не было выделения
      }
    }, true);
    this.#addSpecialKey('ArrowUp', () => {
      const previousLineLength = this.#getPreviousLineLength();
      if (previousLineLength >= 0) {
        this.#inputElement.selectionStart
        -= this.#getCursorPositionFromBeginOfLine()
        + previousLineLength
        - Math.min(previousLineLength, this.#getCursorPositionFromBeginOfLine()) + 1;
        this.#inputElement.selectionEnd = this.#inputElement.selectionStart;
      }
    }, true);

    // обрабатываем tab
    this.#addSpecialKey('Tab', () => {
      this.#inputElement.value += '\t'; // добавляем специальный символ табуляции
    }, true);

    // обрабатываем enter
    this.#addSpecialKey('Enter', () => {
      this.#inputElement.value += '\n'; // добавляем символ перевода строки
    }, true);

    // обработка capsLock
    const holdCapsLocktKey = () => {
      this.#capsKey = !this.#capsKey;
      this.#refreshKeyLabels(); // обновляем кнопочки
      if (!this.#capsKey) { // если сняли
        this.#deActivateKey('CapsLock'); // сняли с него выделение
      }
    };
    this.#addSpecialKey('CapsLock', holdCapsLocktKey);

    // обработка смены языка
    this.#addSpecialKey('Fn', () => {
      if (this.#layout === 'en') {
        this.changeLayout('ru');
      } else {
        this.changeLayout('en');
      }
    }, true);
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
        const keyElement = document.createElement('div');
        keyElement.classList.add('keyboard-key');
        keyElement.setAttribute('id', key.code ?? `Key${(engRows[i][j].key ?? engRows[i][j]).toUpperCase()}`);
        // key у объекта - берется он, если нет то просто key
        keyElement.addEventListener('click', () => this.#type(i, j)); // обрабатываем нажатие каждой клавиши
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

  // добавляет обработчик для специальной клавиши
  #addSpecialKey(code, handler, deativateAfter = false) { // первый параметр
    // определяет какую клавишу сейчас обрабатываем
    this.#specialKeys[code] = () => {
      this.#activateKey(code); // добаляет класс active
      handler(); // функция которая обрабатывает нажатие клавиши
      if (deativateAfter) { // если третий паметр true то
        setTimeout(() => {
          this.#deActivateKey(code); // снять active класс через 50 мс
        }, 50);
      }
    };
  }

  #isUpperCaseRequired() {
    return (this.#capsKey && !this.#shiftKey) || (!this.#capsKey && this.#shiftKey);
  }

  #type(i, j) { // функция которая печатает
    const key = layouts[this.#layout][i][j];
    this.#inputElement.focus();
    if (this.#specialKeys[key.code]) { // если специальная клавиша
      this.#specialKeys[key.code](); // то вызываем код связанный с этой специальной клавишей
      return;
    }
    // для всех остальных клавиш вызовется следующий код
    if (!this.#altKey && !this.#ctrlKey && !this.#metaKey) { // обработка клавиатурных сочетаний
      // - их не печатает
      const keyToType = this.#isUpperCaseRequired() // зажат ли shift?
        ? (key.shift ?? key.key ?? key).toUpperCase() // если зажат берем клавишу
        // - знаки у цифр, если просто буква приводит в upperCase
        : (key.key ?? key); // иначе если не зажат shift
      this.#inputElement.value += keyToType; // добавляем к тексту в инпут
      // этот символ который надо напечатать
      const code = key.code ?? `Key${(key.key ?? key).toUpperCase()}`;
      this.#activateKey(code);
      setTimeout(() => {
        this.#deActivateKey(code);
      }, 50);
    }
    if (this.#shiftKey) { // если все-таки шифт зажат на виртуальной клавиатуре то мы его сбрасываем
      this.#shiftKey = false;
      this.#refreshKeyLabels(); // обновляются upper на lower case или наоборот
    }
    this.#altKey = false;
    this.#ctrlKey = false;
    this.#metaKey = false;
    Object.keys(this.#specialKeys).filter((code) => code !== 'CapsLock').forEach((code) => {
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
    if (e) { // обработка аппаратного capslock
      this.#capsKey = e.getModifierState('CapsLock'); // метод у клавиатурных событий - дает true или false
      // получает состояние клавиши capsLock
      if (this.#capsKey) { // если физически capsLock зажат
        this.#activateKey('CapsLock'); // подсветить клавиатуру
      } else { // если не зажат
        this.#deActivateKey('CapsLock'); // то снять подсветку
      }
    }
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
        const upperCaseKey = (this.#specialKeys[key.code]
          ? key.key
          : (key.shift ?? key.key ?? key).toUpperCase());
        keyElement.innerText = this.#isUpperCaseRequired()
          ? upperCaseKey
          : (key.key ?? key);
      }
    });
  }

  // возвращает позицию курсора относительно текущей строки
  #getCursorPositionFromBeginOfLine() {
    // ищем символ разрыва абзацев перед текущей позицией
    const index = this.#inputElement.value.lastIndexOf('\n', this.#inputElement.selectionStart);
    // вычитаем позицию перевода строки из текущей позиции курсора
    return this.#inputElement.selectionStart - (index + 1);
  }

  // возвращает длину предыдущей строки
  #getPreviousLineLength() {
    // рассчет конца и начала предыдущей строки
    const end = this.#inputElement.value.lastIndexOf('\n', this.#inputElement.selectionStart - 1);
    const start = this.#inputElement.value.lastIndexOf('\n', end - 1);
    return end - start - 1;
  }

  // возвращает длину следующей строки
  #getNextLineLength() {
    // от текущего ищем вправо
    let start = this.#inputElement.value.indexOf('\n', this.#inputElement.selectionStart);
    if (start < 0) { // если вдруг не нашли - значит уже конец,
      // чтобы не получить -1,  то присваивам длину всей строчки
      start = this.#inputElement.value.length;
    }
    // продолжаем искать следующий перевод строки от следующего  за стартом
    let end = this.#inputElement.value.indexOf('\n', start + 1);
    if (end < 0) { // если не найдено - считаем что мы достигли конца текста
      // и присваиваем всю длину текста
      end = this.#inputElement.value.length;
    }
    return end - start - 1;
  }

  // возвращает длину текущей строки
  #getCurrentLineLength() {
    // ищем ближайший с левой стороны от курсора перевод строки
    const start = this.#inputElement.value.lastIndexOf('\n', this.#inputElement.selectionStart - 1);
    // ищем ближайший с правой стороны от курсора перевод строки
    let end = this.#inputElement.value.indexOf('\n', this.#inputElement.selectionStart);
    // учитываем что можем оказаться в конце текста
    if (end < 0) {
      // если не нашли - присваиваем длину всего текста
      end = this.#inputElement.value.length;
    }
    // расчитываем длину текущей строчки и отнимаем символ переноса строки (дополнительно -1)
    return end - start - 1;
  }
}
