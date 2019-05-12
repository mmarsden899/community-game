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
    .catch(ui.destroyCharacterFailure)
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
    if (!window.currentPlaying && window.charCreated) {
      $('#play').show()
    } else if (window.charCreated) {
      $('#alreadyplayed').show()
    }
  } else {
    $('#play').hide()
    $('#alreadyplayed').hide()
    $('#create-character').show()
    $('#destroychar').hide()
  }
}

// character Events
const onGetCharacters = function () {
  if (gameIsBeingPlayed) {
    api.getCharacters()
      .then(ui.showCharacterSuccess)
      .catch(ui.showCharacterFailure)
  }
}

const addHandlers = function () {
  $('#create-character').hide()
  $('#create-character').on('click', onCreateCharacter)
  $('#destroychar').on('click', onDestroyCharacter)
}

module.exports = {
  addHandlers,
  onGetCharacters,
  canCreateCharacter,
  onUpdateCharacter
}
