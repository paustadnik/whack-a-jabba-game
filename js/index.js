const canvas = document.querySelector(".canvas")
const ctx = canvas.getContext("2d");

const playField = document.querySelector(".playField")
const hidingObjects = document.querySelectorAll(".hiding-object")
const score = document.querySelector(".score > span")
const scoreContainer = document.querySelector(".scoringArea")
const jabbas = document.querySelectorAll(".jabba")
const startBtn = document.querySelector('.startBtn')

let points = 0;

function hideGame() {
    playField.style.visibility = 'hidden'
    scoreContainer.style.visibility = "hidden"
    points = 0
}

function startGame() {
    playField.style.visibility = 'visible'
    scoreContainer.style.visibility = 'visible'
    startBtn.style.visibility = 'hidden'
}

window.onload = () => {
    hideGame()
}

startBtn.onclick = () => {
    startGame() 

    const interval = setInterval(() => {
        const randIndex = Math.floor(Math.random() * hidingObjects.length)
        hidingObjects.forEach((object) => {
            object.classList.remove('active')
        });
        hidingObjects[randIndex].classList.add('active')
    }, 1200)

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