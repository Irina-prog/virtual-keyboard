const layouts = {

  en: [
    [{ shift: '±', key: '§', code: 'Backquote' }, { shift: '!', key: '1', code: 'Digit1' }, { shift: '@', key: '2', code: 'Digit2' }, { shift: '#', key: '3', code: 'Digit3' }, { shift: '$', key: '4', code: 'Digit4' }, { shift: '%', key: '5', code: 'Digit5' }, { shift: '^', key: '6', code: 'Digit6' }, { shift: '&', key: '7', code: 'Digit7' }, { shift: '*', key: '8', code: 'Digit8' }, { shift: '(', key: '9', code: 'Digit9' }, { shift: ')', key: '0', code: 'Digit0' }, { shift: '_', key: '-', code: 'Minus' }, { shift: '+', key: '=', code: 'Equal' }, { key: '←', code: 'Backspace' }],
    [{ key: 'tab', code: 'Tab' }, 'q', 'w', 'e', 'r', 't', 'y', 'u', 'i', 'o', 'p', { shift: '{', key: '[', code: 'BracketLeft' }, { shift: '}', key: ']', code: 'BracketRight' }, { key: 'del', code: 'Delete' }],
    [{ key: 'caps', code: 'CapsLock' }, 'a', 's', 'd', 'f', 'g', 'h', 'j', 'k', 'l', { shift: ':', key: ';', code: 'Semicolon' }, { shift: '"', key: '\'', code: 'Quote' }, { shift: '|', key: '\\', code: 'Backslash' }, { key: 'enter', code: 'Enter' }],
    [{ key: 'shift', code: 'ShiftLeft' }, { shift: '~', key: '`', code: 'IntlBackslash' }, 'z', 'x', 'c', 'v', 'b', 'n', 'm', { shift: '<', key: ',', code: 'Comma' }, { shift: '>', key: '.', code: 'Period' }, { shift: '/', key: '?', code: 'Slash' }, { key: '▲', code: 'ArrowUp' }, { key: 'shift', code: 'ShiftRight' }],
    [{ key: 'lang', code: 'Fn' }, { key: 'ctrl', code: 'ControlLeft' }, { key: 'opt', code: 'AltLeft' }, { key: 'cmd', code: 'MetaLeft' }, { key: ' ', code: 'Space' }, { key: 'cmd', code: 'MetaRight' }, { key: 'opt', code: 'AltRight' }, { key: '◀', code: 'ArrowLeft' }, { key: '▼', code: 'ArrowDown' }, { key: '▶', code: 'ArrowRight' }],
  ],
  ru: [
    [{ shift: '<', key: '>' }, { shift: '!', key: '1' }, { shift: '"', key: '2' }, { shift: '№', key: '3' }, { shift: '%', key: '4' }, { shift: ':', key: '5' }, { shift: ',', key: '6' }, { shift: '.', key: '7' }, { shift: ';', key: '8' }, { shift: '(', key: '9' }, { shift: ')', key: '0' }, { shift: '_', key: '-' }, { shift: '+', key: '=' }, { key: '←', code: 'Backspace' }],
    [{ key: 'tab', code: 'Tab' }, 'й', 'ц', 'у', 'к', 'е', 'н', 'г', 'ш', 'щ', 'з', 'х', 'ъ', { key: 'del', code: 'Delete' }],
    [{ key: 'caps', code: 'CapsLock' }, 'ф', 'ы', 'в', 'а', 'п', 'р', 'о', 'л', 'д', 'ж', 'э', 'ё', { key: 'enter', code: 'Enter' }],
    [{ key: 'shift', code: 'ShiftLeft' }, { shift: '~', key: '`' }, 'я', 'ч', 'с', 'м', 'и', 'т', 'ь', 'б', 'ю', { shift: '/', key: '?', code: 'Slash' }, { key: '▲', code: 'ArrowUp' }, { key: 'shift', code: 'ShiftRight' }],
    [{ key: 'lang', code: 'Fn' }, { key: 'ctrl', code: 'ControlLeft' }, { key: 'opt', code: 'AltLeft' }, { key: 'cmd', code: 'MetaLeft' }, { key: ' ', code: 'Space' }, { key: 'cmd', code: 'MetaRight' }, { key: 'opt', code: 'AltRight' }, { key: '◀', code: 'ArrowLeft' }, { key: '▼', code: 'ArrowDown' }, { key: '▶', code: 'ArrowRight' }],
  ],
};

export default layouts;
