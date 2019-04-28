const config = require('./config')
const store = require('./store')
const getFormFields = require('./../../lib/get-form-fields')
const app = require('./app')
const showMessagesTemplate = require('./templates/message-listing.handlebars')

window.charCreated = false

const names = ['Bob', 'Greg', 'Joe', 'Essel']

const getCharacters = function () {
  return $.ajax({
    url: config.apiUrl + '/characters',
    method: 'GET',
    headers: {
    }
  })
}

const onGetCharacters = function () {
  getCharacters()
    .then(showCharacterSuccess)
    .catch(showCharacterFailure)
  setTimeout(onGetCharacters, 500)
}
const showCharacterFailure = function (data) {
  console.log('failed with dataaa ' + data)
}

const showCharacterSuccess = function (data) {
  store.otherCharacters = data
  store.character = data.characters[window.userIDIndex]
  console.log('isshowcharactersuccessfiring?')
  // console.log(store.character.user_name)
  // console.log(store.character.id)
  // console.log('storeeeeeee id is ' + store.character.id)
  // console.log('==================oooo=======================')
  // console.log('the user index things are ' + store.otherCharacters.characters[window.userIDIndex].id)
  // console.log('the stores user id is ' + store.character.id)
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
        'user_name': names[Math.floor(Math.random() * names.length)],
        'x': 250,
        'y': 200
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
  console.log('window character created is ' + window.charCreated)
  window.positionX = store.userCharacter.character.x
  window.positionY = store.userCharacter.character.y
  window.user_name = store.userCharacter.character.user_name
  window.id = store.userCharacter.character.id
  console.log('character success with ' + store.userCharacter.character.x)
  console.log('character app positionX is ' + app.positionX)
  console.log(store.userCharacter.character.user_name)
}

const createCharacterFailure = function (data) {
  console.log('failed with data ' + JSON.stringify(data))
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
        'active': true
      }
    }
  })
}


const onUpdateCharacter = function () {
  console.log('is update character firing?')
  updateCharacter()
    .then(updateCharacterSuccess)
    .catch(updateCharacterFailure)
  setTimeout(onUpdateCharacter, 500)
}

const onUpdateCharacterOnce = function () {
  updateCharacter()
    .then(updateCharacterSuccess)
    .catch(updateCharacterFailure)
}

const isCharCreatedTrue = function () {
  console.log('is char created true firing?')
  if (window.charCreated === true) {
    onUpdateCharacter()
    console.log('this should be working charcreated')
  } else {
    console.log('window CharCreated isnt true')
    setTimeout(isCharCreatedTrue, 500)
  }
}

const updateCharacterSuccess = function (data) {
  console.log('update character success with' + data)
}

const updateCharacterFailure = function (data) {
  console.log('update character failure with ' + JSON.stringify(data))
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
    .catch(console.log('sign in failure' + JSON.stringify(data)))
}

const signInSuccess = function (data) {
  store.user = data.user
  canCreateCharacter()
  window.charCreated = true
  console.log(data.user)
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
    .catch(console.log('sign up failure with data ' + JSON.stringify(data)))
}


const signUpSuccess = function (data) {
  console.log('sign up is firing succesfully')
}

const unLoad = function () {
  return $.ajax({
    url: config.apiUrl + `/characters/${store.character.id}`,
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
    console.log(userIDArray)
  }
  if (userIDArray.some(function (index) { return index === store.user.id })) {
    window.userIDIndex = userIDArray.findIndex(function (index) { return index === store.user.id })
    console.log('=======================================================')
    window.positionX = store.otherCharacters.characters[window.userIDIndex].x
    window.positionY = store.otherCharacters.characters[window.userIDIndex].y
    window.user_name = store.otherCharacters.characters[window.userIDIndex].user_name
    window.id = store.otherCharacters.characters[window.userIDIndex].id
    console.log('heyyyyyyyyyyyyy this works')
  } else {
    console.log('this shouldnt be working')
    $('#create-character').show()
  }
}

const getMessageSuccess = (data) => {
  console.log('================================================')
  console.log(data)
  store.allMessages = data
  console.log('store allmessages is showing as' + store.allMessages.messages[1].text)
}

const onGetMessages = (event) => {
  console.log('were getting to onGetMessages')
  getMessages()
    .then(getMessageSuccess)
    .catch(console.log('ongetmessages did not function'))
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
  console.log(data)
  console.log('===================')
  sendText(data)
    .then('on send text success')
    .catch('on send text fialure')
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
    .then(console.log('charactersuccesfullydestroyed'))
    .catch(console.log('characterdidnotdestroy'))
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
  onUpdateCharacterOnce,
  onSignUp,
  signUp,
  getMessages,
  onGetMessages,
  getMessageSuccess,
  onSendText,
  onDestroyCharacter,
  destroyCharacter
}
