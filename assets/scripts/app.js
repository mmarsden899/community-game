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

const SCALE = 1
const WIDTH = 60
const HEIGHT = 60
const SCALED_WIDTH = SCALE * WIDTH
const SCALED_HEIGHT = SCALE * HEIGHT
const CYCLE_LOOP = [0, 1, 0, 2]
const OTHER_CYCLE_LOOP = [0, 1, 0, 2]
const FACING_DOWN = 0
const FACING_UP = 1
const FACING_LEFT = 2
const FACING_RIGHT = 3
const FRAME_LIMIT = 12
const MOVEMENT_SPEED = 1.75

const characterSprites = ['https://i.imgur.com/UXlqiz6.png', 'https://i.imgur.com/NFU0D5v.png', 'https://i.imgur.com/cQf38Yp.png']

let canvas = document.querySelector('canvas')
let ctx = canvas.getContext('2d')
ctx.font = '15px Oxygen Mono'
let keyPresses = {}
let validKeys = ['w', 'a', 's', 'd', 'Enter']
window.charCreated = false

window.currentDirection = [FACING_DOWN, 'FACING_DOWN']
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

store.userCharacter = {}
store.userCharacter.character = 0
// let onUpdateChar = setInterval(test.onUpdateCharacter, 1000)
for (let i = 0; i < 100; i++) {
  let star = '<div class="star" style="animation: twinkle '+ ((Math.random()*5) + 5)+'s linear '+((Math.random()*5) + 5)+'s infinite; top: '+Math.random()*$(window).height()/2+'px; left: '+Math.random()*$(window).width()+'px;"></div>';
  $('.modal').append(star)
}

let speech = new Image()
let speech2 = new Image()
let speech3 = new Image()
let error = new Image()

let otherUser

const directionMethod = function (charDirect) {
  if (charDirect === 'FACING_UP') {
    otherUser = FACING_UP
  } else if (charDirect === 'FACING_DOWN') {
    otherUser = FACING_DOWN
  } else if (charDirect === 'FACING_RIGHT') {
    otherUser = FACING_RIGHT
  } else {
    otherUser = FACING_LEFT
  }
  return otherUser
}
let value
const imgWhich = function (num) {
  if (num === '3') {
    value = img3
  } else if (num === '2') {
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
  img.src = 'https://i.imgur.com/UXlqiz6.png'
  img.onload = function () {
    window.requestAnimationFrame(gameLoop)
  }

  img2.src = 'https://i.imgur.com/NFU0D5v.png'
  img2.onload = function () {
    window.requestAnimationFrame(gameLoop)
  }

  img3.src = 'https://i.imgur.com/cQf38Yp.png'
  img3.onload = function () {
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
}

const showMessageOnRender = function () {
  for (let i = 0; i < store.allMessages.messages.length; i++) {
    if (store.allMessages.messages[i].user_id === window.id &&
      moment(store.allMessages.messages[i].created_at).add(10, 'seconds').format() >=
      (moment().format())) {
      if (store.allMessages.messages[i].text.length > 20) {
        ctx.drawImage(speech, window.positionX - 80, window.positionY - 50)
        ctx.fillText(store.allMessages.messages[i].text, window.positionX - (store.allMessages.messages[i].text.length * 2.45), window.positionY - 31)
      } else if (store.allMessages.messages[i].text.length > 10) {
        ctx.drawImage(speech2, window.positionX - 55, window.positionY - 50)
        ctx.fillText(store.allMessages.messages[i].text, window.positionX - (store.allMessages.messages[i].text.length * 2.45), window.positionY - 30)
      } else if (store.allMessages.messages[i].text.length > 0) {
        ctx.drawImage(speech3, window.positionX - 25, window.positionY - 50)
        ctx.fillText(store.allMessages.messages[i].text, window.positionX - (store.allMessages.messages[i].text.length * 2.45), window.positionY - 30)
      } else {
        ctx.fillText(' ', window.positionX + 21.5, window.positionY - 20)
      }
    }
  }
}

function drawFrame (num, frameX, frameY, canvasX, canvasY) {
  ctx.drawImage(imgWhich(num),
    frameX * WIDTH, frameY * HEIGHT, WIDTH, HEIGHT,
    canvasX, canvasY, SCALED_WIDTH, SCALED_HEIGHT)
}

loadImage()

function gameLoop () {
  ctx.clearRect(0, 0, canvas.width, canvas.height)

  window.hasMoved = false

  if (keyPresses.w) {
    moveCharacter(0, -MOVEMENT_SPEED, FACING_UP, 'FACING_UP')
    window.hasMoved = true
  } else if (keyPresses.s) {
    moveCharacter(0, MOVEMENT_SPEED, FACING_DOWN, 'FACING_DOWN')
    window.hasMoved = true
  }

  if (keyPresses.a) {
    moveCharacter(-MOVEMENT_SPEED, 0, FACING_LEFT, 'FACING_LEFT')
    window.hasMoved = true
  } else if (keyPresses.d) {
    moveCharacter(MOVEMENT_SPEED, 0, FACING_RIGHT, 'FACING_RIGHT')
    window.hasMoved = true
  }

  if (keyPresses.Enter) {

  }

  if (window.hasMoved) {
    frameCount++
    if (frameCount >= FRAME_LIMIT) {
      frameCount = 0
      currentLoopIndex++
      if (currentLoopIndex >= CYCLE_LOOP.length) {
        currentLoopIndex = 0
      }
    }
  }

  if (!window.hasMoved) {
    currentLoopIndex = 0
  }

  if (window.charCreated === true) {
    Object.keys(store.otherCharacters.characters).forEach(function (key) {
      if ((store.otherCharacters.characters[key].active === true) &&
      (store.otherCharacters.characters[key].id !== window.id)) {
        for (let i = 0; i < store.allMessages.messages.length; i++) {
          if (store.allMessages.messages[i].user_id === store.otherCharacters.characters[key].user_id &&
            moment(store.allMessages.messages[i].created_at).add(10, 'seconds').format() >=
            (moment().format())) {
            if (store.allMessages.messages[i].text.length > 20) {
              ctx.drawImage(speech, store.otherCharacters.characters[key].x - 80, store.otherCharacters.characters[key].y - 50)
              // ctx.fillText(store.allMessages.messages[i].text, window.positionX - (store.allMessages.messages[i].text.length * 2.45), window.positionY - 31)
              ctx.fillText(store.allMessages.messages[i].text, store.otherCharacters.characters[key].x - (store.allMessages.messages[i].text.length * 2.45), store.otherCharacters.characters[key].y - 31)
            } else if (store.allMessages.messages[i].text.length > 10) {
              ctx.drawImage(speech2, store.otherCharacters.characters[key].x - 55, store.otherCharacters.characters[key].y - 50)
              ctx.fillText(store.allMessages.messages[i].text, store.otherCharacters.characters[key].x - (store.allMessages.messages[i].text.length * 2.45), store.otherCharacters.characters[key].y - 31)
            } else if (store.allMessages.messages[i].text.length > 0) {
              ctx.drawImage(speech3, store.otherCharacters.characters[key].x - 25, store.otherCharacters.characters[key].y - 50)
              ctx.fillText(store.allMessages.messages[i].text, store.otherCharacters.characters[key].x - (store.allMessages.messages[i].text.length * 2.45), store.otherCharacters.characters[key].y - 31)
            } else {
              ctx.fillText(' ', store.otherCharacters.characters[key].x + 21.5, store.otherCharacters.characters[key].y - 20)
            //  ctx.fillText(store.allMessages.messages[i].text, store.otherCharacters.characters[key].x + 21.5, store.otherCharacters.characters[key].y - 20)
            }
          }
        }
        if (store.otherCharacters.characters[key].moving === true) {
          otherFrameCount[key]++
          if (otherFrameCount[key] >= FRAME_LIMIT) {
            otherFrameCount[key] = 0
            otherCurrentLoopIndex[key]++
            if (otherCurrentLoopIndex[key] >= OTHER_CYCLE_LOOP.length) {
              otherCurrentLoopIndex[key] = 0
            }
          }
        }
        if (store.otherCharacters.characters[key].moving === true) {
          ctx.fillText(store.otherCharacters.characters[key].user_name, store.otherCharacters.characters[key].x + (store.otherCharacters.characters[key].user_name.length * 1.75), store.otherCharacters.characters[key].y - 10)
          drawFrame(store.otherCharacters.characters[key].spritesheet, OTHER_CYCLE_LOOP[otherCurrentLoopIndex[key]], directionMethod(store.otherCharacters.characters[key].direction), store.otherCharacters.characters[key].x, store.otherCharacters.characters[key].y)
        } else {
          ctx.fillText(store.otherCharacters.characters[key].user_name, store.otherCharacters.characters[key].x + (store.otherCharacters.characters[key].user_name.length * 1.75), store.otherCharacters.characters[key].y - 10)
          drawFrame(store.otherCharacters.characters[key].spritesheet, OTHER_CYCLE_LOOP[0], directionMethod(store.otherCharacters.characters[key].direction), store.otherCharacters.characters[key].x, store.otherCharacters.characters[key].y)
        }
      }
    }
    )
    showMessageOnRender()
    ctx.fillText(window.user_name, window.positionX - (window.user_name.length * 1.75), window.positionY - 10)
    drawFrame(window.sprite, CYCLE_LOOP[currentLoopIndex], window.currentDirection[0], window.positionX, window.positionY)
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
  if (window.positionX + deltaX > 0 && window.positionX + SCALED_WIDTH + deltaX < canvas.width && ((window.positionX + deltaX <= 345 || window.positionY + deltaY >= 150) || (window.positionX + deltaX >= 665 || window.positionY + deltaY >= 150))) {
    window.positionX += deltaX
  }
  if (window.positionY + deltaY > 90 && window.positionY + SCALED_HEIGHT + deltaY < canvas.height && ((window.positionX + deltaX <= 345 || window.positionY + deltaY >= 150) || (window.positionX + deltaX >= 665 || window.positionY + deltaY >= 150))) {
    window.positionY += deltaY
  }
  window.currentDirection[0] = direction
  window.currentDirection[1] = stringDirection
}

const setHTTPRequests = function () {
  window.getCharInt = setInterval(charEvents.onGetCharacters, 1000)
  window.updateCharInt = setInterval(charEvents.onUpdateCharacter, 1000)
  window.getMess = setInterval(messageEvents.onGetMessages, 1000)
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
