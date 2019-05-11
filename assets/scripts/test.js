const config = require('./config')
const store = require('./store')


// Messages UI
const getMessageSuccess = (data) => {
  store.allMessages = data
}
// Messages UI
const onGetMessages = (event) => {
  getMessages()
    .then(getMessageSuccess)
    .catch()
}
// Messages API
const getMessages = function () {
  return $.ajax({
    url: config.apiUrl + '/messages',
    method: 'GET',
    headers: {
    }
  })
}

// Messages API
const onSendText = function (event) {
  event.preventDefault()
  const data = $('#text-input').val()
  $('form').trigger('reset')
  sendText(data)
    .then()
    .catch()
}
// Messages API
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

// MISC HIDE MODAL
const hideModal = function () {
  $('.modal').hide()
  $('#play').hide()
  $('#alreadyplayed').show()
  window.currentPlaying = true
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
  getMessages,
  onGetMessages,
  getMessageSuccess,
  onSendText,
  hideModal,
  loginSignUp,
  backToLogin,
  toChangePass,
  passToAccount,
  playedToPlay,
  playToAccount,
  onTicTac
}
