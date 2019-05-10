const config = require('../config')
const store = require('../store')

// Auth API
const signIn = function (data) {
  return $.ajax({
    url: config.apiUrl + '/sign-in',
    method: 'POST',
    data
    // data: data
  })
}

// Auth API
const logOut = function () {
  return $.ajax({
    url: config.apiUrl + '/sign-out',
    method: 'DELETE',
    headers: {
      Authorization: 'Token token=' + store.user.token
    }
  })
}

// Auth Events
const changePass = function (data) {
  return $.ajax({
    url: config.apiUrl + '/change-password',
    method: 'PATCH',
    headers: {
      Authorization: 'Token token=' + store.user.token
    },
    data
  })
}

// Auth API
const signUp = function (data) {
  return $.ajax({
    url: config.apiUrl + '/sign-up',
    method: 'POST',
    data
  })
}

// Misc UNLOAD feature
const unLoad = function () {
  return $.ajax({
    url: config.apiUrl + `/characters/${window.id}`,
    async: false,
    method: 'PATCH',
    headers: {
      Authorization: 'Token token=' + store.user.token
    },
    data: {
      'character': {
        'active': false
      }
    }
  })
}

module.exports = {
  signIn,
  signUp,
  logOut,
  changePass,
  unLoad
}
