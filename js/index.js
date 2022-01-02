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


let points = 0;
let currentTime = 40
timer.innerHTML = `00:${currentTime}`
let hasWon = false




function hideGame() {
    playField.style.visibility = 'hidden'
    scoreContainer.style.visibility = 'hidden'
    timerArea.style.visibility = 'hidden'
    points = 0
    disappointedHan.style.display = 'none'
        tryHarder.style.display = 'none'
        winThatsRight.style.display = 'none'
}

function startGame() {
    playField.style.visibility = 'visible'
    scoreContainer.style.visibility = 'visible'
    timerArea.style.visibility = 'visible'
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

function jabbaGame() {
    let jabbaLeiaClasses = ['jabba', 'leia']
    let jabbaInterval = setInterval(() => {
        const randIndex = Math.floor(Math.random() * hidingObjects.length)
        const index = Math.floor(Math.random() * jabbaLeiaClasses.length)
        console.log(index)
        hidingObjects.forEach((object) => {
            object.classList.remove('active')
        });
        jabbas.forEach((object) => {
            object.classList.remove('jabba')
            object.classList.remove('leia')
        })
        hidingObjects[randIndex].classList.add('active')
        jabbas[randIndex].classList.add(jabbaLeiaClasses[index])
        if (currentTime === 0) {
            clearInterval(jabbaInterval)
            hidingObjects[randIndex].classList.remove('active')

            setTimeout(() => {
                result(points)
            }, 1000)
        }
    
        hidingObjects.forEach((element) => {
            element.onclick = () => {
                if (element.classList.contains('active')) {
                    console.log('You clicked!')
                    points++
                }
                if (element.classList.contains('leia')) {
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

startBtn.onclick = () => {
    startGame()
    countdown()
    jabbaGame()
}


