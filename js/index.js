const canvas = document.querySelector(".canvas")
const ctx = canvas.getContext("2d");

const playField = document.querySelector(".playField")
const hidingObjects = document.querySelectorAll(".hiding-object")
const score = document.querySelector(".score > span")
const scoreContainer = document.querySelector(".scoringArea")
const jabbas = document.querySelectorAll(".jabba")
const startBtn = document.querySelector('.startBtn')
const timerArea = document.querySelector('.scoreTimeContainer')
const timer = document.querySelector('.timer')
const disappointedHan = document.querySelector('.disappointedHan')
const tryHarder = document.querySelector('.tryHarder')
const winThatsRight = document.querySelector('.winThatsRight')
const playAgainBtn = document.querySelector('.playAgainBtn')
const gameTitleImg = document.querySelector('.gameTitleImg')
const nameInputContainer = document.querySelector('.nameInputContainer')


let points = 0;
let currentTime = 30
timer.innerHTML = `00:${currentTime}`
let hasWon = false

let saberBuzz = new Audio()
saberBuzz.src = '../images/Saberblk.mp3'

function hideGame() {
    playAgainBtn.style.visibility = 'hidden'
    playField.style.display = 'none'
    scoreContainer.style.visibility = 'hidden'
    timerArea.style.visibility = 'hidden'
    disappointedHan.style.display = 'none'
    tryHarder.style.display = 'none'
    winThatsRight.style.display = 'none'
    nameInputContainer.style.display = 'none'
}

function startGame() {
    startBtn.style.visibility = 'hidden'
    playAgainBtn.style.visibility = 'hidden'
    playField.style.display = 'flex'
    scoreContainer.style.visibility = 'visible'
    timerArea.style.visibility = 'visible'
    disappointedHan.style.display = 'none'
    tryHarder.style.display = 'none'
    winThatsRight.style.display = 'none'
    gameTitleImg.style.width = '25%'
}

function countdown() {
    let timeInterval = setInterval(() => {
        currentTime -= 1
        if (currentTime < 10) {
            timer.innerHTML = `00:0${currentTime}`
            timer.style.color = 'red'
        }
        else {
            timer.innerHTML = `00:${currentTime}`
        }
        if (currentTime === 0) {
            clearInterval(timeInterval)
        }
    }, 1000);
}

window.onload = () => {
    hideGame()
}

function jabbaGame() {
    let jabbaLeiaClasses = ['jabba', 'jabba', 'leia', 'jabba']
    let previousIndex = 0
    let jabbaInterval = setInterval(() => {
        let index = Math.floor(Math.random() * jabbaLeiaClasses.length)
        let randIndex = Math.floor(Math.random() * hidingObjects.length)
        if (previousIndex === randIndex) {
            randIndex = Math.floor(Math.random() * hidingObjects.length)
        }
        previousIndex = randIndex

        hidingObjects.forEach((object) => {
            object.classList.remove('active')
            object.classList.remove('princess')
            object.classList.remove('hutt')
        })

        jabbas.forEach((object) => {
            object.classList.remove('leia')
        })

        hidingObjects[randIndex].classList.add('active')
        jabbas[randIndex].classList.add(jabbaLeiaClasses[index])

        if (jabbaLeiaClasses[index] === 'leia') {
            hidingObjects[randIndex].classList.add('princess')
        }

        if (jabbaLeiaClasses[index] === 'jabba') {
            hidingObjects[randIndex].classList.add('hutt')
        }

        if (currentTime === 0) {
            clearInterval(jabbaInterval)
            hidingObjects[randIndex].classList.remove('active')

            setTimeout(() => {
                result(points)
            }, 500)
        }
    
        hidingObjects.forEach((element) => {
            element.onclick = () => {
                saberBuzz.play()
                saberBuzz.volume = 0.3
                if (element.classList.contains('hutt')) {
                    console.log('You clicked!')
                    points++
                }
                if (element.classList.contains('princess')) {
                    console.log('Oh no! You hit Leia!')
                    points -= 3
                }
                score.innerHTML = points
            }
        })
    }, 1100)
}

function result(total) {
    playField.style.display = 'none'
    playAgainBtn.style.visibility = 'visible'

    if (total < 10) {
        disappointedHan.style.display = 'flex'
        tryHarder.style.display = 'none'
        winThatsRight.style.display = 'none'
        
    }
    else if (total >= 10 && total <= 20) {
        disappointedHan.style.display = 'none'
        tryHarder.style.display = 'flex'
        winThatsRight.style.display = 'none'
    }
    else if (total > 20) {
        disappointedHan.style.display = 'none'
        tryHarder.style.display = 'none'
        winThatsRight.style.display = 'flex'
    }
}

function playAgain() {
    points = 0
    score.innerHTML = points
    currentTime = 30
    startGame()
    countdown()
    jabbaGame()
}

startBtn.onclick = () => {
    startGame()
    countdown()
    jabbaGame()
}

playAgainBtn.onclick = () => {
    playAgain()
}


