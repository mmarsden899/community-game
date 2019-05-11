const store = require('../store')
const charEvents = require('./../character/events')

// Auth UI
const signInSuccess = function (data) {
  charEvents.onGetCharacters()
  charEvents.isCharCreatedTrue()
  $('#accounts-page').show()
  $('#loginForms').hide()
  $('#signInError').text(' ')
  $('form').trigger('reset')
  $('#accountError').text('Sign in success!')
  store.user = data.user
  setTimeout(charEvents.canCreateCharacter, 1000)
}

// Auth UI
const signUpFailure = function () {
  $('form').trigger('reset')
  $('#signUpError').text('Sign-up failed. Please try again.')
}

// Auth UI
const signInError = function () {
  $('form').trigger('reset')
  $('#signInError').text('Sign in error. Please try again')
}

// Auth UI
const signUpSuccess = function (data) {
  $('#loginForms').show()
  $('#signUpForm').hide()
  $('form').trigger('reset')
  $('#signInError').text('Sign-up success')
}

// Auth UI
const logoutSuccess = function () {
  $('#accounts-page').hide()
  $('#loginForms').show()
  $('#alreadyplayed').hide()
  store.user.token = null
}

// AUTH UI
const logoutFailure = function () {
}

// Auth UI
const onChangePassSuccess = function (data) {
  $('#changepass').hide()
  $('#accounts-page').show()
  $('#accountError').css('color', 'white')
  $('#accountError').text('Password succesfully changed')
}

// Auth UI
const onChangePassFailure = function () {
  $('#password-error').text('Something went wrong. Please try again')
}

module.exports = {
  signInSuccess,
  signUpFailure,
  signInError,
  signUpSuccess,
  logoutSuccess,
  logoutFailure,
  onChangePassSuccess,
  onChangePassFailure
}
