class Stats {
    constructor(stats = { strength: 0, speed: 0, toughness: 0, spiritualEnergy: 0, spiritualBarrier: 0 }) {
        this.strength = stats.strength
        this.speed = stats.speed
        this.toughness = stats.toughness
        this.spiritualEnergy = stats.spiritualEnergy
        this.spiritualBarrier = stats.spiritualBarrier
    }

    levelUpStat({ skill, amount }) {
        this[skill] += amount;
    }
}

module.exports = Stats;