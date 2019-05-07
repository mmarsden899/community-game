const config = require('./config')
const store = require('./store')
const getFormFields = require('./../../lib/get-form-fields')
const app = require('./app')
const userNames = require('./user-names')



window.charCreated = false
let gameIsBeingPlayed = true

const getCharacters = function () {
  return $.ajax({
    url: config.apiUrl + '/characters',
    method: 'GET',
    headers: {
    }
  })
}

const onGetCharacters = function () {
  if (gameIsBeingPlayed) {
    getCharacters()
      .then(showCharacterSuccess)
      .catch(showCharacterFailure)
  } else {
    console.log('game is not being played currently')
}
}
const showCharacterFailure = function (data) {
}

const showCharacterSuccess = function (data) {
  store.otherCharacters = data
  store.character = data.characters[window.userIDIndex]
}

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

const onCreateCharacter = function () {
  createCharacter()
    .then(createCharacterSuccess)
    .catch(createCharacterFailure)
}

const createCharacterSuccess = function (data) {
  store.userCharacter = data
  window.charCreated = true
  window.positionX = store.userCharacter.character.x
  window.positionY = store.userCharacter.character.y
  window.user_name = store.userCharacter.character.user_name
  window.id = store.userCharacter.character.id
  $('#create-character').hide()
  $('#destroychar').show()
  $('#accountError').text('Character created!')
  if (!window.currentPlaying) {
    $('#play').show()
}
}

const createCharacterFailure = function (data) {

}

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


const onUpdateCharacter = function () {
//  console.log('is update character firing?')
  updateCharacter()
    .then(updateCharacterSuccess)
    .catch(updateCharacterFailure)
}

const isCharCreatedTrue = function () {
  if (window.charCreated === true) {
      console.log('suh')
  } else {
    setTimeout(isCharCreatedTrue, 500)
  }
}

const updateCharacterSuccess = function (data) {
//  console.log('update character success with' + data)
}

const updateCharacterFailure = function (data) {
//  console.log('update character failure with ' + JSON.stringify(data))
}


const signIn = function (data) {
  return $.ajax({
    url: config.apiUrl + '/sign-in',
    method: 'POST',
    data
    // data: data
  })
}

const onSignIn = function (event) {
  event.preventDefault()
  const data = getFormFields(event.target)
  signIn(data)
    .then(signInSuccess)
    .catch(signInError)
}

const signInSuccess = function (data) {
  isCharCreatedTrue()
  $('#accounts-page').show()
  $('#loginForms').hide()
  $('#signInError').text(' ')
  $('form').trigger('reset')
  $('#accountError').text('Sign in success!')
  store.user = data.user
  canCreateCharacter()
}

const signInError = function () {
  $('form').trigger('reset')
  $('#signInError').text('Sign in error. Please try again')
}

const signUp = function (data) {
  return $.ajax({
    url: config.apiUrl + '/sign-up',
    method: 'POST',
    data
  })
}

const onSignUp = function (event) {
  event.preventDefault()
  const data = getFormFields(event.target)
  signUp(data)
    .then(signUpSuccess)
    .catch(signUpFailure)
}


const signUpSuccess = function (data) {
  $('#loginForms').show()
  $('#signUpForm').hide()
  $('form').trigger('reset')
  $('#signInError').text('Sign-up success')
}

const signUpFailure = function () {
  $('form').trigger('reset')
  $('#signUpError').text('Sign-up failed. Please try again.')
}

const unLoad = function () {
  return $.ajax({
    url: config.apiUrl + `/characters/${window.id}`,
    async: false,
    method: 'PATCH',
    headers: {
      Authorization: 'Token token=' + store.user.token
    },
    data: {
      'character': {
        'active': false
      }
    }
  })
}

const canCreateCharacter = function () {
  const userIDArray = []
  for (let i = 0; i < store.otherCharacters.characters.length; i++) {
    userIDArray.push(store.otherCharacters.characters[i].user_id)
  }
  if (userIDArray.some(function (index) { return index === store.user.id })) {
    window.userIDIndex = userIDArray.findIndex(function (index) { return index === store.user.id })
//    console.log('=======================================================')
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

const getMessageSuccess = (data) => {
  store.allMessages = data
}

const onGetMessages = (event) => {
  getMessages()
    .then(getMessageSuccess)
    .catch()
  setTimeout(onGetMessages, 500)
}

const getMessages = function () {
  return $.ajax({
    url: config.apiUrl + '/messages',
    method: 'GET',
    headers: {
    }
  })
}

const onSendText = function (event) {
  event.preventDefault()
  const data = $('#text-input').val()
  $('form').trigger('reset')
  sendText(data)
    .then()
    .catch()
}

const sendText = function (data) {
  return $.ajax({
    url: config.apiUrl + '/messages',
    method: 'POST',
    headers: {
      Authorization: 'Token token=' + store.user.token
    },
    data: {
      'message': {
        'user_id': store.user.id,
        'user_name': window.user_name,
        'text': data
      }
    }
  })
}

const destroyCharacter = function () {
  return $.ajax({
    url: config.apiUrl + `/characters/${window.id}`,
    method: 'DELETE',
    headers: {
      Authorization: 'Token token=' + store.user.token
    }
  })
}

const onDestroyCharacter = function (event) {
  event.preventDefault()
  destroyCharacter()
    .then(destroyCharacterSuccess)
    .catch()
}

const destroyCharacterSuccess = function () {
  canCreateCharacter()
  $('#play').hide()
  $('#destroychar').hide()
  $('#create-character').show()
  $('#accountError').text('Character deleted')
}

const hideModal = function () {
  $('.modal').hide()
  $('#play').hide()
  $('#alreadyplayed').show()
  window.currentPlaying = true
}

const loginSignUp = function () {
  $('#loginForms').hide()
  $('#signUpForm').show()
}

const backToLogin = function () {
  $('#signUpForm').hide()
  $('#loginForms').show()
}

const logOut = function () {
  return $.ajax({
    url: config.apiUrl + '/sign-out',
    method: 'DELETE',
    headers: {
      Authorization: 'Token token=' + store.user.token
    }
})
}

const logoutSuccess = function () {
  $('#accounts-page').hide()
  $('#loginForms').show()
  $('#alreadyplayed').hide()
  store.user.token = null
}

const logoutFailure = function () {
}

const onLogOut = function () {
  logOut()
    .then(logoutSuccess)
    .catch(logoutFailure)
}

const toChangePass = function () {
  $('#accounts-page').hide()
  $('#accountError').text(' ')
  $('#changepass').show()
}

const onChangePass = function (event) {
  event.preventDefault()
  const data = getFormFields(event.target)
  changePass(data)
    .then(onChangePassSuccess)
    .catch(onChangePassFailure)
}

const onChangePassSuccess = function (data) {
  $('#changepass').hide()
  $('#accounts-page').show()
  $('#accountError').css('color', 'white')
  $('#accountError').text('Password succesfully changed')
}

const onChangePassFailure = function () {
  $('#password-error').text('Something went wrong. Please try again')
}

const changePass = function (data) {
  return $.ajax({
    url: config.apiUrl + '/change-password',
    method: 'PATCH',
    headers: {
      Authorization: 'Token token=' + store.user.token
    },
    data
  })
}

const passToAccount = function () {
  $('#changepass').hide()
  $('#accounts-page').show()
}

const playedToPlay = function () {
  $('.modal').hide()
}

const playToAccount = function () {
  $('.modal').show()
}

const onViewCharacter = function () {
  $('#accounts-page').hide()
}

const onTicTac = function () {
  $('#accounts-page').hide()
  $('#tictactoe').show()
}

module.exports = {
  getCharacters,
  onGetCharacters,
  createCharacter,
  onCreateCharacter,
  createCharacterSuccess,
  signIn,
  onSignIn,
  signInSuccess,
  onUpdateCharacter,
  updateCharacter,
  isCharCreatedTrue,
  unLoad,
  onSignUp,
  signUp,
  getMessages,
  onGetMessages,
  getMessageSuccess,
  onSendText,
  onDestroyCharacter,
  destroyCharacter,
  hideModal,
  loginSignUp,
  backToLogin,
  onLogOut,
  toChangePass,
  onChangePass,
  passToAccount,
  playedToPlay,
  playToAccount,
  onTicTac
}
