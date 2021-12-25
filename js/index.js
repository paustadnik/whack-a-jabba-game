const canvas = document.querySelector(".canvas")
const ctx = canvas.getContext("2d");

const hidingObjects = document.querySelectorAll(".hiding-object")

let points = 0;


setInterval(() => {
    const randIndex = Math.floor(Math.random() * hidingObjects.length)

    hidingObjects.forEach((object) => {
        object.classList.remove('active')
    });

    hidingObjects[randIndex].classList.add('active')
}, 1000)