const store = require('../store')
const events = require('./events')

// character UI
const showCharacterFailure = function (data) {
  $('#serverstatus').html('Currently Disconnected')
  $('#serverstatus').css('color', 'red')
}

// character UI
const showCharacterSuccess = function (data) {
  store.otherCharacters = data
  store.character = data.characters[window.userIDIndex]
  $('#serverstatus').html('Currently Connected')
  $('#serverstatus').css('color', 'white')
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
  $('#accountError').css('color', 'white')
  if (!window.currentPlaying) {
    $('#play').show()
  } else {
    $('#alreadyplayed').show()
  }
}

// character UI
const createCharacterFailure = function (data) {
  $('#accountError').text('Something went wrong!')
  $('#accountError').css('color', 'red')
}

// character UI
const updateCharacterSuccess = function (data) {
  $('#serverstatus').html('Currently Connected')
  $('#serverstatus').css('color', 'white')
}

// character UI
const updateCharacterFailure = function (data) {
  $('#serverstatus').html('Currently Disconnected')
  $('#serverstatus').css('color', 'red')
}

// Characters UI
const destroyCharacterSuccess = function () {
  $('#play').hide()
  $('#alreadyplayed').hide()
  $('#destroychar').hide()
  $('#create-character').show()
  $('#accountError').text('Character deleted')
  $('#accountError').css('color', 'white')
  setTimeout(events.canCreateCharacter, 1000)
}

const destroyCharacterFailure = function () {
  $('#accountError').text('Something went wrong')
  $('#accountError').css('color', 'red')
  setTimeout(events.canCreateCharacter, 1000)
}

module.exports = {
  showCharacterFailure,
  showCharacterSuccess,
  createCharacterSuccess,
  createCharacterFailure,
  updateCharacterSuccess,
  updateCharacterFailure,
  destroyCharacterSuccess,
  destroyCharacterFailure
}
