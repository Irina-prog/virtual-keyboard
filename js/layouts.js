const layouts = {

  en: [
    [{ shift: '±', key: '§', code: 'Backquote' }, { shift: '!', key: '1', code: 'Digit1' }, { shift: '@', key: '2', code: 'Digit2' }, { shift: '#', key: '3', code: 'Digit3' }, { shift: '$', key: '4', code: 'Digit4' }, { shift: '%', key: '5', code: 'Digit5' }, { shift: '^', key: '6', code: 'Digit6' }, { shift: '&', key: '7', code: 'Digit7' }, { shift: '*', key: '8', code: 'Digit8' }, { shift: '(', key: '9', code: 'Digit9' }, { shift: ')', key: '0', code: 'Digit0' }, { shift: '_', key: '-', code: 'Minus' }, { shift: '+', key: '=', code: 'Equal' }, { key: 'backspace', code: 'Backspace' }],
    [{ key: '\t', code: 'Tab' }, 'q', 'w', 'e', 'r', 't', 'y', 'u', 'i', 'o', 'p', { shift: '{', key: '[', code: 'BracketLeft' }, { shift: '}', key: ']', code: 'BracketRight' }],
    [{ key: 'caps', code: 'CapsLock' }, 'a', 's', 'd', 'f', 'g', 'h', 'j', 'k', 'l', { shift: ':', key: ';', code: 'Semicolon' }, { shift: '"', key: '\'', code: 'Quote' }, { shift: '|', key: '\\', code: 'Backslash' }, { key: '\n', code: 'Enter' }],
    [{ key: 'shift', code: 'ShiftLeft' }, { shift: '~', key: '`', code: 'IntlBackslash' }, 'z', 'x', 'c', 'v', 'b', 'n', 'm', 'up', { shift: '<', key: ',', code: 'Comma' }, { shift: '>', key: '.', code: 'Period' }, { shift: '/', key: '?', code: 'Slash' }, { key: 'shift', code: 'ShiftRight' }],
    [{ key: 'ctrl', code: 'ControlLeft' }, { key: 'opt', code: 'AltLeft' }, { key: 'cmd', code: 'MetaLeft' }, { key: ' ', code: 'Space' }, { key: 'cmd', code: 'MetaRight' }, { key: 'opt', code: 'AltRight' }, { key: 'left', code: 'ArrowLeft' }, { key: 'down', code: 'ArrowDown' }, { key: 'right', code: 'ArrowRight' }],
  ],
  ru: [
    [{ shift: '<', key: '>' }, { shift: '!', key: '1' }, { shift: '"', key: '2' }, { shift: '№', key: '3' }, { shift: '%', key: '4' }, { shift: ':', key: '5' }, { shift: ',', key: '6' }, { shift: '.', key: '7' }, { shift: ';', key: '8' }, { shift: '(', key: '9' }, { shift: ')', key: '0' }, { shift: '_', key: '-' }, { shift: '+', key: '=' }, 'backspace'],
    ['tab', 'й', 'ц', 'у', 'к', 'е', 'н', 'г', 'ш', 'щ', 'щ', 'з', 'х', 'ъ'],
    ['caps', 'ф', 'ы', 'в', 'а', 'п', 'р', 'о', 'л', 'д', 'ж', 'э', 'ё', 'enter'],
    ['shift', { shift: '~', key: '`' }, 'я', 'ч', 'с', 'м', 'и', 'т', 'ь', 'ь', 'б', 'ю', { shift: '?', key: '/' }, 'shift'],
    [{ key: 'ctrl', code: 'ControlLeft' }, { key: 'opt', code: 'AltLeft' }, { key: 'cmd', code: 'MetaLeft' }, { key: 'space', code: 'Space' }, { key: 'cmd', code: 'MetaRight' }, { key: 'opt', code: 'AltRight' }, { key: 'left', code: 'ArrowLeft' }, { key: 'down', code: 'ArrowDown' }, { key: 'right', code: 'ArrowRight' }],
  ],
};

export default layouts;
