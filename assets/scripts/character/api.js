const config = require('../config')
const store = require('../store')
const userNames = require('../user-names')

// character API
const getCharacters = function () {
  return $.ajax({
    url: config.apiUrl + '/characters',
    method: 'GET',
    headers: {
    }
  })
}

// character API
const createCharacter = function (data) {
  return $.ajax({
    url: config.apiUrl + '/characters',
    method: 'POST',
    headers: {
      Authorization: 'Token token=' + store.user.token
    },
    data: {
      'character': {
        'user_id': store.user.id,
        'user_name': `${userNames.adj[Math.floor(Math.random() * userNames.adj.length)]}${userNames.noun[Math.floor(Math.random() * userNames.noun.length)]}`,
        'x': 250,
        'y': 200,
        'spritesheet': (Math.floor(Math.random() * 3))
      }
    }
  })
}

// character API
const updateCharacter = function () {
  return $.ajax({
    url: config.apiUrl + `/characters/${window.id}`,
    method: 'PATCH',
    headers: {
      Authorization: 'Token token=' + store.user.token
    },
    data: {
      'character': {
        'x': window.positionX,
        'y': window.positionY,
        'direction': window.currentDirection[1],
        'moving': window.hasMoved,
        'active': true
      }
    }
  })
}

// Characters API
const destroyCharacter = function () {
  return $.ajax({
    url: config.apiUrl + `/characters/${window.id}`,
    method: 'DELETE',
    headers: {
      Authorization: 'Token token=' + store.user.token
    }
  })
}

module.exports = {
  getCharacters,
  createCharacter,
  updateCharacter,
  destroyCharacter
}
