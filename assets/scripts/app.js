'use strict'

// use require with a reference to bundle the file and use it in this file
// const example = require('./example')

// use require without a reference to ensure a file is bundled
// require('./example')

const test = require('./test')
const store = require('./store')
const moment = require('moment')
const authEvents = require('./auth/events')
const charEvents = require('./character/events')
const messageEvents = require('./message/events')

const playerSize = 64
const frameLoop = [0, 1, 2, 3, 4, 5, 6, 7, 8]
const onlineFrameLoop = [0, 1, 2, 3, 4, 5, 6, 7, 8]
const moveLoop = [0, 1, 2, 3, 4]
const moveSouth = 14
const moveNorth = 12
const moveWest = 13
const moveRight = 15
const faceSouth = 10
const faceNorth = 8
const faceWest = 9
const faceRight = 11
const frameLimit = 7
const playerSpeed = 1.65

const characterSprites = ['https://i.imgur.com/UXlqiz6.png', 'https://i.imgur.com/NFU0D5v.png', 'https://i.imgur.com/cQf38Yp.png']

let canvas = document.querySelector('canvas')
let ctx = canvas.getContext('2d')
ctx.font = '15px Oxygen Mono'
let keyPresses = {}
let validKeys = ['w', 'a', 's', 'd', 'Enter']
window.charCreated = false

window.currentDirection = [faceSouth, 'faceSouth']
let currentLoopIndex = 0
let otherCurrentLoopIndex = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]
let frameCount = 0
let otherFrameCount = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]
window.positionX = 0
window.positionY = 0
window.user_name = ''
window.currentPlaying = false
window.keyPressError = true
let img = new Image()
let img2 = new Image()
let img3 = new Image()
let img4 = new Image()
let img5 = new Image()
let img6 = new Image()
let img7 = new Image()
let img8 = new Image()
let img9 = new Image()
let img10 = new Image()
let img11 = new Image()
let img12 = new Image()
let img13 = new Image()
let img14 = new Image()

store.userCharacter = {}
store.userCharacter.character = 0
// let onUpdateChar = setInterval(test.onUpdateCharacter, 1000)
for (let i = 0; i < 100; i++) {
  let star = '<div class="star" style="animation: twinkle ' + ((Math.random() * 5) + 5) + 's linear ' + ((Math.random() * 5) + 5) + 's infinite; top: ' + Math.random() * $(window).height() / 2 + 'px; left: ' + Math.random() * $(window).width() + 'px;"></div>'
  $('.modal').append(star)
}

let speech = new Image()
let speech2 = new Image()
let speech3 = new Image()
let error = new Image()
let transparent =  new Image()

let otherUser

const directionMethod = function (charDirect) {
  if (charDirect === 'faceNorth') {
    otherUser = faceNorth
  } else if (charDirect === 'faceSouth') {
    otherUser = faceSouth
  } else if (charDirect === 'faceRight') {
    otherUser = faceRight
  } else {
    otherUser = faceWest
  }
  return otherUser
}
let value
const imgWhich = function (num) {
  if (num === '14') {
    value = img14
  } else if (num === '13') {
    value = img13
  } else if (num === '12') {
    value = img12
  } else if (num === '11') {
    value = img11
  } else if (num === '10') {
    value = img10
  } else if (num === '9') {
    value = img9
  } else if (num === '8') {
    value = img8
  } else if (num === '7') {
    value = img7
  } else if (num === '6') {
    value = img6
  } else if (num === '5') {
    value = img5
  } else if (num === '4') {
    value = img4
  } else if (num === '3') {
    value = img3
  } else if (num === '1') {
    value = img2
  } else {
    value = img
  }
  return value
}
store.cantPress = false
window.addEventListener('keydown', keyDownListener)
function keyDownListener (event) {
  keyPresses[event.key] = true
  if (!keyPresses.w && !keyPresses.a && !keyPresses.s && !keyPresses.d && !keyPresses.Enter && !store.cantPress) {
    keyPresses[event.key] = false
    window.keyPressError = true
  } else {
    window.keyPressError = false
  }
}

window.addEventListener('click', mouseOverListener)
function mouseOverListener (event) {
  if (event.target.localName === 'input') {
    store.cantPress = true
  } else {
    store.cantPress = false
  }
}

window.addEventListener('keyup', keyUpListener)
function keyUpListener (event) {
  keyPresses[event.key] = false
}

function loadImage () {
  img.src = 'https://i.imgur.com/WRR1pK6.png'
  img.onload = function () {
    window.requestAnimationFrame(gameLoop)
  }

  img2.src = 'https://i.imgur.com/LLnnye4.png'
  img2.onload = function () {
    window.requestAnimationFrame(gameLoop)
  }

  img3.src = 'https://i.imgur.com/kGzATwp.png'
  img3.onload = function () {
    window.requestAnimationFrame(gameLoop)
  }

  img4.src = 'https://i.imgur.com/GR88Vnw.png'
  img4.onload = function () {
    window.requestAnimationFrame(gameLoop)
  }

  img5.src = 'https://i.imgur.com/kWnpSoi.png'
  img5.onload = function () {
    window.requestAnimationFrame(gameLoop)
  }

  img6.src = 'https://i.imgur.com/UQcPC8d.png'
  img6.onload = function () {
    window.requestAnimationFrame(gameLoop)
  }
  img7.src = 'https://i.imgur.com/EgomPir.png'
  img7.onload = function () {
    window.requestAnimationFrame(gameLoop)
  }
  img8.src = 'https://i.imgur.com/5NBxDmg.png'
  img8.onload = function () {
    window.requestAnimationFrame(gameLoop)
  }
  img9.src = 'https://i.imgur.com/Xqj6dOC.png'
  img9.onload = function () {
    window.requestAnimationFrame(gameLoop)
  }
  img10.src = 'https://i.imgur.com/l4eLe9s.png'
  img10.onload = function () {
    window.requestAnimationFrame(gameLoop)
  }
  img11.src = 'https://i.imgur.com/tv2joXf.png'
  img11.onload = function () {
    window.requestAnimationFrame(gameLoop)
  }
  img12.src = 'https://i.imgur.com/dFWJ7GR.png'
  img12.onload = function () {
    window.requestAnimationFrame(gameLoop)
  }
  img13.src = 'https://i.imgur.com/xA2xd1e.png'
  img13.onload = function () {
    window.requestAnimationFrame(gameLoop)
  }
  img14.src = 'https://i.imgur.com/h22fbhS.png'
  img14.onload = function () {
    window.requestAnimationFrame(gameLoop)
  }

  speech.src = 'https://i.imgur.com/wa090e7.png'
  speech.onload = function () {
    window.requestAnimationFrame(gameLoop)
  }
  speech2.src = 'https://i.imgur.com/1VwqSa5.png'
  speech2.onload = function () {
    window.requestAnimationFrame(gameLoop)
  }
  speech3.src = 'https://i.imgur.com/xoWbu6X.png'
  speech3.onload = function () {
    window.requestAnimationFrame(gameLoop)
  }
  error.src = 'https://i.imgur.com/5wdNwEB.png'
  error.onload = function () {
    window.requestAnimationFrame(gameLoop)
  }
  transparent.src = 'https://i.imgur.com/nehDt1Y.png'
  transparent.onload = function () {
    window.requestAnimationFrame(gameLoop)
  }
}

const timeToBrowse = function () {
  $('#computerBrowser').show()
}

const showMessageOnRender = function () {
  for (let i = 0; i < store.allMessages.messages.length; i++) {
    if (store.allMessages.messages[i].user_id === store.user.id &&
      moment(store.allMessages.messages[i].created_at).add(10, 'seconds').format() >=
      (moment().format())) {
      if (store.allMessages.messages[i].text.length > 20) {
        ctx.drawImage(speech, window.positionX - (speech.width / 2) + 32, window.positionY - 50)
        ctx.fillStyle = '#000'
        ctx.fillText(store.allMessages.messages[i].text, window.positionX - (store.allMessages.messages[i].text.length * 15 / 4) + 32, window.positionY - 31)
      } else if (store.allMessages.messages[i].text.length > 10) {
        ctx.drawImage(speech2, window.positionX - (speech2.width / 2) + 32, window.positionY - 50)
        ctx.fillStyle = '#000'
        ctx.fillText(store.allMessages.messages[i].text, window.positionX - (store.allMessages.messages[i].text.length * 15 / 4) + 32, window.positionY - 30)
      } else if (store.allMessages.messages[i].text.length > 0) {
        ctx.drawImage(speech3, window.positionX - (speech3.width / 2) + 32, window.positionY - 50)
        ctx.fillStyle = '#000'
        ctx.fillText(store.allMessages.messages[i].text, window.positionX - (store.allMessages.messages[i].text.length * 15 / 4) + 32, window.positionY - 30)
      } else {
        ctx.fillText(' ', window.positionX + 21.5, window.positionY - 20)
      }
    }
  }
}

function drawFrame (num, frameX, frameY, canvasX, canvasY) {
  ctx.drawImage(imgWhich(num),
    frameX * playerSize, frameY * playerSize, playerSize, playerSize,
    canvasX, canvasY, playerSize * 0.95, playerSize * 0.95)
}

loadImage()

function gameLoop () {
  ctx.clearRect(0, 0, canvas.width, canvas.height)

  window.hasMoved = false

  if (keyPresses.w) {
    moveCharacter(0, -playerSpeed, faceNorth, 'faceNorth')
    window.hasMoved = true
  } else if (keyPresses.s) {
    moveCharacter(0, playerSpeed, faceSouth, 'faceSouth')
    window.hasMoved = true
  }

  if (keyPresses.a) {
    moveCharacter(-playerSpeed, 0, faceWest, 'faceWest')
    window.hasMoved = true
  } else if (keyPresses.d) {
    moveCharacter(playerSpeed, 0, faceRight, 'faceRight')
    window.hasMoved = true
  }

  // come back to this for user interactions
  if (keyPresses.Enter && !(Math.ceil(window.positionX / 10) * 10 === 100 || Math.ceil(window.positionX / 10) * 10 === 90 || Math.ceil(window.positionX / 10) * 10 === 80) && (Math.ceil(window.positionY / 10) * 10 === 100)) {
    // console.log(window.positionX)
    // console.log('oh heyyyyyyyy')
  } else {
    timeToBrowse()
  }

  if (window.hasMoved) {
    frameCount++
    if (frameCount >= frameLimit) {
      frameCount = 0
      currentLoopIndex++
      if (currentLoopIndex >= frameLoop.length) {
        currentLoopIndex = 0
      }
    }
  }

  if (!window.hasMoved) {
    currentLoopIndex = 0
  }

  if (window.charCreated === true) {
    Object.keys(store.otherCharacters.characters).forEach(function (key) {
      if ((store.otherCharacters.characters[key].active === true && moment(store.otherCharacters.characters[key].updated_at).add(1, 'minutes').format() > moment().format()) &&
      (store.otherCharacters.characters[key].id !== window.id)) {
        for (let i = 0; i < store.allMessages.messages.length; i++) {
          if (store.allMessages.messages[i].user_id === store.otherCharacters.characters[key].user_id &&
            moment(store.allMessages.messages[i].created_at).add(10, 'seconds').format() >=
            (moment().format())) {
            if (store.allMessages.messages[i].text.length > 20) {
              ctx.drawImage(speech, store.otherCharacters.characters[key].x - (speech.width / 2), store.otherCharacters.characters[key].y - 50)
              // ctx.fillText(store.allMessages.messages[i].text, window.positionX - (store.allMessages.messages[i].text.length * 2.45), window.positionY - 31)
              ctx.fillStyle = '#000'
              ctx.fillText(store.allMessages.messages[i].text, store.otherCharacters.characters[key].x - (store.allMessages.messages[i].text.length * 15 / 4), store.otherCharacters.characters[key].y - 31)
            } else if (store.allMessages.messages[i].text.length > 10) {
              ctx.drawImage(speech2, store.otherCharacters.characters[key].x - (speech2.width / 2), store.otherCharacters.characters[key].y - 50)
              ctx.fillStyle = '#000'
              ctx.fillText(store.allMessages.messages[i].text, store.otherCharacters.characters[key].x - (store.allMessages.messages[i].text.length * 15 / 4), store.otherCharacters.characters[key].y - 31)
            } else if (store.allMessages.messages[i].text.length > 0) {
              ctx.drawImage(speech3, store.otherCharacters.characters[key].x - (speech3.width / 2), store.otherCharacters.characters[key].y - 50)
              ctx.fillStyle = '#000'
              ctx.fillText(store.allMessages.messages[i].text, store.otherCharacters.characters[key].x - (store.allMessages.messages[i].text.length * 15 / 4), store.otherCharacters.characters[key].y - 31)
            } else {
              ctx.fillText(' ', store.otherCharacters.characters[key].x + 21.5, store.otherCharacters.characters[key].y - 20)
            //  ctx.fillText(store.allMessages.messages[i].text, store.otherCharacters.characters[key].x + 21.5, store.otherCharacters.characters[key].y - 20)
            }
          }
        }
        if (store.otherCharacters.characters[key].moving === true) {
          otherFrameCount[key]++
          if (otherFrameCount[key] >= frameLimit) {
            otherFrameCount[key] = 1
            otherCurrentLoopIndex[key]++
            if (otherCurrentLoopIndex[key] >= onlineFrameLoop.length) {
              otherCurrentLoopIndex[key] = 0
            }
          }
        }
        if (store.otherCharacters.characters[key].moving === true) {
          ctx.fillStyle = '#fff'
          ctx.fillText(store.otherCharacters.characters[key].user_name, store.otherCharacters.characters[key].x + (store.otherCharacters.characters[key].user_name.length / 2), store.otherCharacters.characters[key].y - 10)
          drawFrame(store.otherCharacters.characters[key].spritesheet, onlineFrameLoop[otherCurrentLoopIndex[key]], directionMethod(store.otherCharacters.characters[key].direction), store.otherCharacters.characters[key].x, store.otherCharacters.characters[key].y)
        } else {
          ctx.fillStyle = '#fff'
          ctx.fillText(store.otherCharacters.characters[key].user_name, store.otherCharacters.characters[key].x + (store.otherCharacters.characters[key].user_name.length / 2), store.otherCharacters.characters[key].y - 10)
          drawFrame(store.otherCharacters.characters[key].spritesheet, onlineFrameLoop[0], directionMethod(store.otherCharacters.characters[key].direction), store.otherCharacters.characters[key].x, store.otherCharacters.characters[key].y)
        }
      }
    }
    )
    drawFrame(window.sprite, frameLoop[currentLoopIndex], window.currentDirection[0], window.positionX, window.positionY)
    ctx.drawImage(transparent, 0, 0)
    ctx.fillStyle = '#fff'
    ctx.fillText(window.user_name, window.positionX - (window.user_name.length / 2), window.positionY - 10)
    showMessageOnRender()
    window.requestAnimationFrame(gameLoop)
    if (window.keyPressError) {
      ctx.drawImage(error, canvas.width / 2 - error.width / 2, canvas.height - 100)
      ctx.fillText('Please use w,a,s or d', canvas.width / 2 - 100, canvas.height - 60)
      ctx.fillText('to move', canvas.width / 2 - 35, canvas.height - 40)
    } else {
      ctx.fillText('', window.positionX, window.positionY)
    }
  }
}

function moveCharacter (deltaX, deltaY, direction, stringDirection) {
  if (window.positionX + deltaX > -15 && window.positionX + deltaX < canvas.width - 48 && ((window.positionX + deltaX <= 325 || (window.positionY + deltaY >= 135 || window.positionY + deltaY <= 82)) || (window.positionX + deltaX >= 675 || window.positionY + deltaY >= 132)) && ((window.positionX + deltaX <= 55 || (window.positionY + deltaY >= 90)) || (window.positionX + deltaX >= 140 || window.positionY + deltaY >= 90))) {
    window.positionX += deltaX
  }
  if (window.positionY + deltaY > 64 && window.positionY + deltaY < canvas.height - 64 && ((window.positionX + deltaX <= 325 || (window.positionY + deltaY >= 135 || window.positionY + deltaY <= 82)) || (window.positionX + deltaX >= 675 || window.positionY + deltaY >= 132)) && ((window.positionX + deltaX <= 55 || (window.positionY + deltaY >= 90)) || (window.positionX + deltaX >= 140 || window.positionY + deltaY >= 90))) {
    window.positionY += deltaY
  }
  window.currentDirection[0] = direction
  window.currentDirection[1] = stringDirection
}

const setHTTPRequests = function () {
  window.getCharInt = setInterval(charEvents.onGetCharacters, 125)
  window.updateCharInt = setInterval(charEvents.onUpdateCharacter, 125)
  window.getMess = setInterval(messageEvents.onGetMessages, 125)
}

const shutOffHTTPRequests = function () {
  clearInterval(window.getCharInt)
  clearInterval(window.updateCharInt)
  clearInterval(window.getMess)
}

$(() => {
  $('#play').hide()
  $('#tictactoe').hide()
  $('.modal').show()
  $('#accounts-page').hide()
  $('#changepass').hide()
  $('#alreadyplayed').hide()
  $('#signUpForm').hide()
  // $('#see-character').on('click', test.onViewCharacter)
  $('#playtoAccount').on('click', test.playToAccount)
  $('#playtoAccount').on('click', shutOffHTTPRequests)
  $('#alreadyplayed').on('click', test.playedToPlay)
  $('#alreadyplayed').on('click', setHTTPRequests)
  $('#back-to-login').on('click', test.backToLogin)
  $('#loginToSignUp').on('click', test.loginSignUp)
  $('#passtoAccount').on('click', test.passToAccount)
  $('#change-password').on('click', test.toChangePass)
  $('#play').on('click', test.hideModal)
  $('#play').on('click', gameLoop)
  $('#play').on('click', setHTTPRequests)
  // $('#tictac').on('click', test.onTicTac)
  authEvents.addHandlers()
  charEvents.addHandlers()
  messageEvents.addHandlers()
})

module.exports = {
  characterSprites
}
