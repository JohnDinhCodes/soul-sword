class MainUI {
    constructor({ mainUIEl }) {
        this.mainUI = mainUIEl;
        this.profile = mainUIEl.querySelector(".main-UI__character-profile");
        this.profileImage = this.profile.querySelector(".main-UI__character-profile__card");
        this.statCard = this.profile.querySelector(".main-UI__character-profile__stats");
        this.mapImage = this.mainUI.querySelector(".main-UI__map-image");
    }

    init() {
        this.showStats();
        this.showMenu();
        this.showMap();
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