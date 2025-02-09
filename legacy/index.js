import StartMenu from "./modules/StartMenu";
import CreationMenu from "./modules/CreationMenu";
import SceneOne from "./modules/SceneOne";
import MainUI from "./modules/MainUI";
import FirstBattle from "./modules/FirstBattle";

// Global Sounds
const clickSound = document.querySelector(".click-sound");
const blipSound = document.querySelector(".blip-sound");

// Music
const battleMusic = document.querySelector(".battle-music");

// All Images
const imgs = document.querySelectorAll("img");


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

// Main Elements
const mainUIEl = gameWindow.querySelector(".main-UI");
const mainWindow = gameWindow.querySelector(".main-screen__window");
const mainTextContainer = mainWindow.querySelector(".main-screen__text-container");
let MainCharacter = JSON.parse(localStorage.getItem("MainCharacter")) || null;


// Scene One Elements 
const sceneOneWindow = gameWindow.querySelector(".scene-one");
const sceneOneMusic = sceneOneWindow.querySelector("audio");
sceneOneMusic.loop = true;
sceneOneMusic.currentTime = 15;
const sceneOneTextContainer = sceneOneWindow.querySelector(".text-container");

const sceneOneDialogue = {
    line1: "At a time before humans were born with souls",
    line2: "Your existence amounted to your skill for survival",
    line3: "Swordsmanship",
    line4: "Spiritual Energy",
    line5: "Hand to hand combat",
    line6: "These core skills were the starting point to a long life",
    line7: "You had to master it all in order to achieve what every human innately desired",
    line8: "Surviving for the chance to encounter the soul sword",
    line9: `Will you be able to achieve the human race's dream?`,
}

// First Battle 
const firstBattleData = {
    part1: {
        line1: "Your parents have disappeared while you were out foraging for food",
        line2: "The other villagers of Yonato have no idea what had happen",
        line3: "It's getting late, the sun is setting soon",
        line4: "Do you want to search for your parents now? Or should you wait until sunrise?",
    },
    part1Buttons: ["Search for your parents", "Wait until sunrise"],
    searchForParents: {
        line1: "Let the yeeting commence", //TODO add dialogue for this choice
        line2: "You have been yeeted"
    }
}

const testData = {
    button1: {
        text: "Search for your parents",
        dialogue: {
            line1: ""
        }
    }
}


// Initial Modules
const startMenu = new StartMenu({ startBtn, clickSound, startWindow });
const createMenu = new CreationMenu({ clickSound, createWindow, createMusic, createForm });
const sceneOne = new SceneOne({ sceneOneWindow, sceneOneMusic, sceneOneDialogue, sceneOneTextContainer, blipSound });
const mainUI = new MainUI({ mainUIEl, MainCharacter });
const firstBattle = new FirstBattle({ mainWindow, firstBattleData, mainTextContainer, blipSound, battleMusic });


// Disables user drag on images
imgs.forEach(img => {
    img.draggable = false;
});


startMenu.startBtnClick(() => {
    if (!MainCharacter) {
        createMenu.showMenu();
        createMenu.formListener(() => {
            sceneOne.playScene();
        });

    } else {
        console.log("Get Scene from Local Storage");
        mainUI.init();
        firstBattle.init();
        // sceneOne.playScene();

    }
});

