const config = require('./config')
const store = require('./store')
const getFormFields = require('./../../lib/get-form-fields')
const app = require('./app')

window.charCreated = false

const names = ['Bob', 'Greg', 'Joe']

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
    .catch(console.log('getcharacterfailure'))
  setTimeout(onGetCharacters, 1000)
}

const showCharacterSuccess = function (data) {
  store.otherCharacters = data
  console.log('xpos is ' + store.otherCharacters.characters[0].x)
  console.log(store.otherCharacters.characters[0])
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
  console.log('character success with ' + store.userCharacter.character.x)
  console.log('character app positionX is ' + app.positionX)
  console.log(store.userCharacter.character.user_name)
}

const createCharacterFailure = function (data) {
  console.log('failed with data ' + data)
}

const updateCharacter = function () {
  return $.ajax({
    url: config.apiUrl + `/characters/${store.userCharacter.character.id}`,
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
  if (window.charCreated === true) {
    console.log('=============' + store.userCharacter.character.id)
  updateCharacter()
    .then(updateCharacterSuccess)
    .catch(updateCharacterFailure)
  setTimeout(onUpdateCharacter, 1000)
} else {
  console.log('not currently true')
  setTimeout(onUpdateCharacter, 1000)
}
}
const isCharCreatedTrue = function () {
  if (window.charCreated === true) {
    onUpdateCharacter()
    console.log('this should be working charcreated')
  } else {
    console.log('window CharCreated isnt true')
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
  console.log(data.user)
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
  isCharCreatedTrue
}
