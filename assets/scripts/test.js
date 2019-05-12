// MISC HIDE MODAL
const hideModal = function () {
  $('.modal').hide()
  $('#play').hide()
  window.currentPlaying = true
  $('#alreadyplayed').show()
}

// MISC SHOW DIVS
const loginSignUp = function () {
  $('#loginForms').hide()
  $('#signUpForm').show()
}

// MISC SHOW DIVS
const backToLogin = function () {
  $('#signUpForm').hide()
  $('#loginForms').show()
}

// MISC SHOW DIVS
const toChangePass = function () {
  $('#accounts-page').hide()
  $('#accountError').text(' ')
  $('#changepass').show()
}

// MISC SHOW DIVS
const passToAccount = function () {
  $('#changepass').hide()
  $('#accounts-page').show()
}

// MISC SHOW DIVS
const playedToPlay = function () {
  $('.modal').hide()
}

// MISC SHOW DIVS
const playToAccount = function () {
  $('.modal').show()
}

// MISC SHOW DIVS
// const onViewCharacter = function () {
//   $('#accounts-page').hide()
// }

// MISC SHOW DIVS
const onTicTac = function () {
  $('#accounts-page').hide()
  $('#tictactoe').show()
}

module.exports = {
  hideModal,
  loginSignUp,
  backToLogin,
  toChangePass,
  passToAccount,
  playedToPlay,
  playToAccount,
  onTicTac
}
