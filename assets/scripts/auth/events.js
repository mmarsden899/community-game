const getFormFields = require('../../../lib/get-form-fields')
const ui = require('./ui')
const api = require('./api')

// Auth Events
const onSignIn = function (event) {
  event.preventDefault()
  const data = getFormFields(event.target)
  api.signIn(data)
    .then(ui.signInSuccess)
    .catch(ui.signInError)
}

// Auth Events
const onSignUp = function (event) {
  event.preventDefault()
  const data = getFormFields(event.target)
  api.signUp(data)
    .then(ui.signUpSuccess)
    .catch(ui.signUpFailure)
}

// Auth Events
const onLogOut = function () {
  api.logOut()
    .then(ui.logoutSuccess)
    .catch(ui.logoutFailure)
}

// Auth Events
const onChangePass = function (event) {
  event.preventDefault()
  const data = getFormFields(event.target)
  api.changePass(data)
    .then(ui.onChangePassSuccess)
    .catch(ui.onChangePassFailure)
}

const addHandlers = function (event) {
  $('#logout').on('click', onLogOut)
  $('#logout').on('click', api.unload)
  $('#change-password-form').on('submit', onChangePass)
  $('#sign-in').on('submit', onSignIn)
  $(window).on('unload', api.unLoad)
  $('#sign-up').on('submit', onSignUp)
}

module.exports = {
  addHandlers
}
