const store = require('../store')
const charEvents = require('./../character/events')

// Auth UI
const signInSuccess = function (data) {
  charEvents.onGetCharacters()
  $('#accounts-page').show()
  $('#loginForms').hide()
  $('#signInError').text(' ')
  $('form').trigger('reset')
  $('#accountError').text('Sign in success!')
  $('#accountError').css('color', 'white')
  store.user = data.user
  setTimeout(charEvents.canCreateCharacter, 1000)
}

// Auth UI
const signUpFailure = function () {
  $('form').trigger('reset')
  $('#signUpError').text('Sign-up failed. Please try again.')
  $('#signUpError').css('color', 'red')
}

// Auth UI
const signInError = function () {
  $('form').trigger('reset')
  $('#signInError').text('Sign in error. Please try again')
  $('#signInError').css('color', 'red')
}

// Auth UI
const signUpSuccess = function (data) {
  $('#loginForms').show()
  $('#signUpForm').hide()
  $('form').trigger('reset')
  $('#signInError').text('Sign-up success')
  $('#signInError').css('color', 'white')
}

// Auth UI
const logoutSuccess = function () {
  $('#accounts-page').hide()
  $('#loginForms').show()
  $('#alreadyplayed').hide()
  store.user.token = null
  store.userCharacter = null
  window.charCreated = null
  window.positionX = null
  window.positionY = null
  window.user_name = null
  window.id = null
  window.sprite = null
}

// AUTH UI
const logoutFailure = function () {
  $('#accountError').text('Logout Failed')
  $('#accountError').css('color', 'red')
}

// Auth UI
const onChangePassSuccess = function (data) {
  $('#changepass').hide()
  $('#accounts-page').show()
  $('#accountError').css('color', 'white')
  $('#accountError').text('Password succesfully changed')
  $('form').trigger('reset')
}

// Auth UI
const onChangePassFailure = function () {
  $('#password-error').text('Something went wrong. Please try again')
  $('#password-error').css('color', 'red')
  $('form').trigger('reset')
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
