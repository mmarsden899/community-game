const api = require('./api')
const ui = require('./ui')

// Messages UI
const onGetMessages = (event) => {
  api.getMessages()
    .then(ui.getMessageSuccess)
    .catch(ui.getMessageFailure)
}

// Messages API
const onSendText = function (event) {
  event.preventDefault()
  const data = $('#text-input').val()
  api.sendText(data)
    .then()
    .catch()
  $('form').trigger('reset')
}

const addHandlers = function (event) {
  $('#sign-in').on('submit', onGetMessages)
  $('#text-submit').on('submit', onSendText)
}

module.exports = {
  addHandlers,
  onGetMessages
}
