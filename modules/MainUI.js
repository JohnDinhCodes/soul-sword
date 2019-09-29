class MainUI {
    constructor({ mainUIEl, MainCharacter }) {
        this.mainUI = mainUIEl;
        this.profile = mainUIEl.querySelector(".main-UI__character-profile");
        this.profileImage = this.profile.querySelector(".main-UI__character-profile__card");
        this.statCard = this.profile.querySelector(".main-UI__character-profile__stats");
        this.mapImage = this.mainUI.querySelector(".main-UI__map-image");
        this.MainCharacter = MainCharacter;
        this.characterLevel = this.profileImage.querySelector(".main-UI__character-profile__level span");

        this.speedStat = this.statCard.querySelector(".speed-stat");
        this.strengthStat = this.statCard.querySelector(".strength-stat");
        this.spiritualEnergyStat = this.statCard.querySelector(".spiritual-energy-stat");
        this.toughnessStat = this.statCard.querySelector(".toughness-stat");
        this.spiritualBarrierStat = this.statCard.querySelector(".spiritual-barrier-stat");
    }

    init() {
        this.showStats();
        this.showMenu();
        this.showMap();
        this.setStats();
    }

    setStats() {
        this.characterLevel.innerHTML = this.MainCharacter.level;
        this.speedStat.innerHTML = this.MainCharacter.speed;
        this.strengthStat.innerHTML = this.MainCharacter.strength;
        this.spiritualEnergyStat.innerHTML = this.MainCharacter.spiritualEnergy;
        this.toughnessStat.innerHTML = this.MainCharacter.toughness;
        this.spiritualBarrierStat.innerHTML = this.MainCharacter.spiritualBarrier;
    }

    showStats() {
        this.profile.addEventListener("mouseover", (e) => {
            this.profileImage.style.opacity = "0";
            this.statCard.style.opacity = 1;

        })
        this.profile.addEventListener("mouseleave", (e) => {
            this.profileImage.style.opacity = 1;
            this.statCard.style.opacity = 0;

        })
    }

    showMap() {
        this.mapImage.addEventListener("click", () => {
            // TODO
            console.log("Implement Different Map Locations Here");
        })
    }

    showMenu() {
        this.mainUI.classList.add("show-ui");
    }
}

module.exports = MainUI;