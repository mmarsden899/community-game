const store = require('../store')

// Messages UI
const getMessageSuccess = (data) => {
  store.allMessages = data
  console.log(data)
}

const getMessageFailure = (data) => {
  console.log('were firing get message failure')
}

module.exports = {
  getMessageSuccess,
  getMessageFailure
}
