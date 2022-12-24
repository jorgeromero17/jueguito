/*
 * Reglas:
 * El final de cada nivel debe ser el inicio del siguiente
*/

const emojis = {
    '-': ' ',
    'O': '⚰️',
    'X': '💣',
    'I': '💝',
    'PLAYER': '👻',
    'BOMB_COLLISION': '🔥',
    'GAME_OVER': '☠️',
    'HEART': '👻',
    'WIN': '❤️‍🔥',
  };
  
  const maps = [];
  maps.push(`
    IXXXXXXXXX
    -XXXXXXXXX
    -XXXXXXXXX
    -XXXXXXXXX
    -XXXXXXXXX
    -XXXXXXXXX
    -XXXXXXXXX
    -XXXXXXXXX
    -XXXXXXXXX
    OXXXXXXXXX
  `);
 maps.push(`
    O--XXXXXXX
    X--XXXXXXX
    XX----XXXX
    X--XX-XXXX
    X-XXX--XXX
    X-XXXX-XXX
    XX--XX--XX
    XX--XXX-XX
    XXXX---IXX
    XXXXXXXXXX
    `);
  maps.push(`
    I-----XXXX
    XXXXX-XXXX
    XX----XXXX
    XX-XXXXXXX
    XX-----XXX
    XXXXXX-XXX
    XX-----XXX
    XX-XXXXXXX
    XX-----OXX
    XXXXXXXXXX
  `);
  maps.push(`
    XXXXXXXXXX
    O--------X
    XXXXXXXX-X
    X------X-X
    X-XXXX-X-X
    X-XIXX-X-X
    X-X----X-X
    X-XXXXXX-X
    X--------X
    XXXXXXXXXX
  `);
  maps.push(`
    XXXXXXXXXX
    X--------X
    X-XXXXXX-X
    X-XXXXXX-X
    X-XXXXXX-X
    X-XXXXXX-X
    X-XXI----X
    X-XXXXXXXX
    X-XXXXXXXX
    XOXXXXXXXX
  `);