const config = require('./config')
const store = require('./store')
const getFormFields = require('./../../lib/get-form-fields')
const app = require('./app')

let charCreated = false

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
        'user_name': 'Bob',
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
  let charCreated = true
  window.positionX = store.userCharacter.character.x
  window.positionY = store.userCharacter.character.y
  console.log('character success with ' + store.userCharacter.character.x)
  console.log('character app positionX is ' + app.positionX)
}

const createCharacterFailure = function (data) {
  console.log('failed with data ' + data)
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
  signInSuccess
}
