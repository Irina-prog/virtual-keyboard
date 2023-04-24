const layouts = {

  en: [
    [{ shift: '±', key: '§' }, { shift: '!', key: '1' }, { shift: '@', key: '2' }, { shift: '#', key: '3' }, { shift: '$', key: '4' }, { shift: '%', key: '5' }, { shift: '^', key: '6' }, { shift: '&', key: '7' }, { shift: '*', key: '8' }, { shift: '(', key: '9' }, { shift: ')', key: '0' }, { shift: '_', key: '-' }, { shift: '+', key: '=' }, 'backspace'],
    ['tab', 'q', 'w', 'e', 'r', 't', 'y', 'u', 'i', 'o', 'p', { shift: '{', key: '[' }, { shift: '}', key: ']' }],
    ['caps', 'a', 's', 'd', 'f', 'g', 'h', 'j', 'k', 'l', { shift: ':', key: ';' }, { shift: '"', key: '\'' }, { shift: '|', key: '\\' }, 'enter'],
    ['shift', { shift: '~', key: '`' }, 'z', 'x', 'c', 'v', 'b', 'n', 'm', 'up', { shift: '<', key: ',' }, { shift: '>', key: '.' }, { shift: '/', key: '?' }, 'shift'],
    ['ctrl', 'opt', 'cmd', 'space', 'cmd', 'opt', 'left', 'down', 'right'],
  ],
  ru: [
    [{ shift: '<', key: '>' }, { shift: '!', key: '1' }, { shift: '"', key: '2' }, { shift: '№', key: '3' }, { shift: '%', key: '4' }, { shift: ':', key: '5' }, { shift: ',', key: '6' }, { shift: '.', key: '7' }, { shift: ';', key: '8' }, { shift: '(', key: '9' }, { shift: ')', key: '0' }, { shift: '_', key: '-' }, { shift: '+', key: '=' }, 'backspace'],
    ['tab', 'й', 'ц', 'у', 'к', 'е', 'н', 'г', 'ш', 'щ', 'щ', 'з', 'х', 'ъ'],
    ['caps', 'ф', 'ы', 'в', 'а', 'п', 'р', 'о', 'л', 'д', 'ж', 'э', 'ё', 'enter'],
    ['shift', { shift: '~', key: '`' }, 'я', 'ч', 'с', 'м', 'и', 'т', 'ь', 'ь', 'б', 'ю', { shift: '?', key: '/' }, 'shift'],
    ['ctrl', 'opt', 'cmd', 'space', 'cmd', 'opt', 'left', 'down', 'right'],
  ],
};

export default layouts;
