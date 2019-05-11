const config = require('../config')
const store = require('../store')

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

// Messages API
const getMessages = function () {
  return $.ajax({
    url: config.apiUrl + '/messages',
    method: 'GET',
    headers: {
    }
  })
}

module.exports = {
  sendText,
  getMessages
}
