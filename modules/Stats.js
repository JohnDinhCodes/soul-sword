class Stats {
    constructor(stats = { strength: 0, speed: 0, toughness: 0, spirtualEnergy: 0, spirtualBarrier: 0 }) {
        this.strength = stats.strength
        this.speed = stats.speed
        this.toughness = stats.toughness
        this.spirtualEnergy = stats.spirtualEnergy
        this.spirtualBarrier = stats.spirtualBarrier
    }

    levelUpStat({ skill, ammount }) {
        this[skill] += ammount;
    }
}

module.exports = Stats;