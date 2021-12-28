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

let points = 0;
let currentTime = 30
timer.innerHTML = `00:${currentTime}`


function hideGame() {
    playField.style.visibility = 'hidden'
    scoreContainer.style.visibility = "hidden"
    timerArea.style.visibility = "hidden"
    points = 0
}

function startGame() {
    playField.style.visibility = 'visible'
    scoreContainer.style.visibility = 'visible'
    timerArea.style.visibility = "visible"
    startBtn.style.visibility = 'hidden'
}

function countdown() {
    let timeInterval = setInterval(() => {
        console.log(currentTime)
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

startBtn.onclick = () => {
    startGame()
    countdown()

    const interval = setInterval(() => {
        const randIndex = Math.floor(Math.random() * hidingObjects.length)
        hidingObjects.forEach((object) => {
            object.classList.remove('active')
        });
        hidingObjects[randIndex].classList.add('active')
    }, 1100)

    hidingObjects.forEach((element) => {
        element.onclick = () => {
            if (element.classList.contains("active")) {
                console.log('You clicked!')
                points++
                score.innerHTML = points
            }
        }
    })
}