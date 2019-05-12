const store = require('../store')
const events = require('./events')

// character UI
const showCharacterFailure = function (data) {
}

// character UI
const showCharacterSuccess = function (data) {
  store.otherCharacters = data
  store.character = data.characters[window.userIDIndex]
}

// character UI
const createCharacterSuccess = function (data) {
  store.userCharacter = data
  window.charCreated = true
  window.positionX = store.userCharacter.character.x
  window.positionY = store.userCharacter.character.y
  window.user_name = store.userCharacter.character.user_name
  window.id = store.userCharacter.character.id
  window.sprite = store.userCharacter.character.spritesheet
  $('#create-character').hide()
  $('#destroychar').show()
  $('#accountError').text('Character created!')
  if (!window.currentPlaying) {
    $('#play').show()
  } else {
    $('#alreadyplayed').show()
  }
}

// character UI
const createCharacterFailure = function (data) {

}

// character UI
const updateCharacterSuccess = function (data) {
}

// character UI
const updateCharacterFailure = function (data) {
}

// Characters UI
const destroyCharacterSuccess = function () {
  $('#play').hide()
  $('#alreadyplayed').hide()
  $('#destroychar').hide()
  $('#create-character').show()
  $('#accountError').text('Character deleted')
  setTimeout(events.canCreateCharacter, 1000)
}

module.exports = {
  showCharacterFailure,
  showCharacterSuccess,
  createCharacterSuccess,
  createCharacterFailure,
  updateCharacterSuccess,
  updateCharacterFailure,
  destroyCharacterSuccess
}
