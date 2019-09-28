import CharacterCreation from "./modules/CharacterCreation";

//Functions
import createListener from "./functions/createListener";

const gameWindow = document.querySelector(".game");
const startWindow = gameWindow.querySelector(".start");
const startBtn = startWindow.querySelector("button");
const createWindow = gameWindow.querySelector(".creation");
const music = createWindow.querySelector("audio");
const form = createWindow.querySelector(".creation__input-form");
const sceneOne = gameWindow.querySelector(".scene-one");
const clickSound = document.querySelector(".click-sound");
const sceneOneMusic = sceneOne.querySelector("audio");

let MainCharacter = JSON.parse(localStorage.getItem("MainCharacter"));
startBtn.addEventListener("click", e => {
    clickSound.play();
    startWindow.remove();
    if (!MainCharacter) {
        music.play();
        createWindow.style.visibility = "visible";
        createWindow.classList.add("fade-in")
        form.addEventListener("submit", createListener);
    } else {
        createWindow.style.display = "none";
        sceneOne.style.visibility = "visible";
        sceneOne.querySelector("img").classList.add("fade-in");
        sceneOneMusic.play();
    }
})




