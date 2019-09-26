import Stats from "./modules/Stats";

const MainCharacter = new Stats({
    speed: 100,
    toughness: 50,
    spirtualEnergy: 200,
    spirtualBarrier: 5,
    strength: 200,
});

console.log(MainCharacter);

MainCharacter.levelUpStat({skill: "speed", ammount: 10})

console.log(MainCharacter);