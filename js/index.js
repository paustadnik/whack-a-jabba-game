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
let doNotTry = new Image()
doNotTry.src = 'https://c.tenor.com/_l6JIUoVnZAAAAAd/there-is-no-try-do-or-do-not.gif'



function hideGame() {
    playField.style.visibility = 'hidden'
    scoreContainer.style.visibility = 'hidden'
    timerArea.style.visibility = 'hidden'
    points = 0
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
    let jabbaLeiaClasses = ['leia', 'jabba']
    let jabbaInterval = setInterval(() => {
        const randIndex = Math.floor(Math.random() * hidingObjects.length)
        let index = Math.floor(Math.random() * jabbaLeiaClasses.length)
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

            result(points)   
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
    if (total < 10) {
        ctx.drawImage(doNotTry, 155, 155 )


        ctx.globalCompositeOperation='destination-over';
        canvas.style.zindex = 2
        playField.style.opacity = '0.2'
        
    }
    else if (total >= 10 && total <= 20) {
        console.log('Good effort!')
    }
    else if (total > 20) {
        console.log('The force is strong in this one')
    }
}

startBtn.onclick = () => {
    startGame()
    countdown()
    jabbaGame()
}


