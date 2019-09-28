// import CharacterCreation from "./modules/CharacterCreation";
import StartMenu from "./modules/StartMenu";
import CreationMenu from "./modules/CreationMenu";
import SceneOne from "./modules/SceneOne";

// Global Sounds
const clickSound = document.querySelector(".click-sound");
const blipSound = document.querySelector(".blip-sound");

// Game Div
const gameWindow = document.querySelector(".game");

// Start Window Elements
const startWindow = gameWindow.querySelector(".start");
const startBtn = startWindow.querySelector("button");

// Character Creation Window Elements
const createWindow = gameWindow.querySelector(".creation");
const createMusic = createWindow.querySelector("audio");
createMusic.loop = true;
createMusic.currentTime = 5;
const createForm = createWindow.querySelector(".creation__input-form");

// Scene One Elements 
const sceneOneWindow = gameWindow.querySelector(".scene-one");
const sceneOneMusic = sceneOneWindow.querySelector("audio");
sceneOneMusic.loop = true;
sceneOneMusic.currentTime = 15;
const sceneOneTextContainer = sceneOneWindow.querySelector(".text-container");
const sceneOneDiologue = {
    line1: "At a time before humans were born with souls",
    line2: "Your existence amounted to your skill for survival",
    line3: "Hand to hand combat",
    line4: "Bladesmithing",
    line5: "Swordsmanship",
    line6: "These core skills were the starting point to a long life",
    line7: "You had to master it all in order to achieve what every human innately desired",
    line8: "Survive for the chance to encounter the soul sword",
}

// Initial Modules
const startMenu = new StartMenu({ startBtn, clickSound, startWindow });
const createMenu = new CreationMenu({ clickSound, createWindow, createMusic, createForm });
const sceneOne = new SceneOne({ sceneOneWindow, sceneOneMusic, sceneOneDiologue, sceneOneTextContainer, blipSound });

let MainCharacter = JSON.parse(localStorage.getItem("MainCharacter"));




startMenu.startBtnClick(() => {
    if (!MainCharacter) {
        createMenu.showMenu();
        createMenu.formListener(() => {
            sceneOne.playScene();
        });

    } else {
        console.log("Get Scene from Local Storage");
        sceneOne.playScene();

    }
});

