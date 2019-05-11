const ui = require('./ui')
const api = require('./api')
const store = require('../store')

const gameIsBeingPlayed = true

// character Events
const onUpdateCharacter = function () {
  api.updateCharacter()
    .then(ui.updateCharacterSuccess)
    .catch(ui.updateCharacterFailure)
}

// Characters Events
const onDestroyCharacter = function (event) {
  event.preventDefault()
  api.destroyCharacter()
    .then(ui.destroyCharacterSuccess)
    .then(canCreateCharacter)
    .catch()
}

// character Events
const onCreateCharacter = function () {
  api.createCharacter()
    .then(ui.createCharacterSuccess)
    .catch(ui.createCharacterFailure)
}

// Character MISC
const canCreateCharacter = function () {
  const userIDArray = []
  for (let i = 0; i < store.otherCharacters.characters.length; i++) {
    userIDArray.push(store.otherCharacters.characters[i].user_id)
  }
  if (userIDArray.some(function (index) { return index === store.user.id })) {
    window.userIDIndex = userIDArray.findIndex(function (index) { return index === store.user.id })
    window.positionX = store.otherCharacters.characters[window.userIDIndex].x
    window.positionY = store.otherCharacters.characters[window.userIDIndex].y
    window.user_name = store.otherCharacters.characters[window.userIDIndex].user_name
    window.sprite = store.otherCharacters.characters[window.userIDIndex].spritesheet
    window.id = store.otherCharacters.characters[window.userIDIndex].id
    window.charCreated = true
    $('#play').show()
  } else {
    $('#create-character').show()
    $('#destroychar').hide()
  }
}

// character MISC
const isCharCreatedTrue = function () {
  if (window.charCreated === true) {
  } else {
    setTimeout(isCharCreatedTrue, 500)
  }
}

// character API
const onGetCharacters = function () {
  if (gameIsBeingPlayed) {
    api.getCharacters()
      .then(ui.showCharacterSuccess)
      .catch(ui.showCharacterFailure)
  } else {
  }
}

const addHandlers = function () {
  $('#create-character').hide()
  $('#create-character').on('click', onCreateCharacter)
  $('#destroychar').on('click', onDestroyCharacter)
  $('#updatechar').on('click', isCharCreatedTrue)
}

module.exports = {
  addHandlers,
  onGetCharacters,
  canCreateCharacter,
  isCharCreatedTrue,
  onUpdateCharacter
}
