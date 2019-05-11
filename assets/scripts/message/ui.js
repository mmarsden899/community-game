const store = require('../store')

// Messages UI
const getMessageSuccess = (data) => {
  store.allMessages = data
}

const getMessageFailure = (data) => {
}

module.exports = {
  getMessageSuccess,
  getMessageFailure
}
