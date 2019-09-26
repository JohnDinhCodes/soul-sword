class Stats {
    constructor({strength, speed, toughness, spirtualEnergy, spirtualBarrier}) {
        this.strength = strength,
        this.speed = speed,
        this.toughness = toughness,
        this.spirtualEnergy = spirtualEnergy,
        this.spirtualBarrier = spirtualBarrier
    }

    levelUpStat({skill, ammount}) {
        this[skill] += ammount;
    }
}

module.exports = Stats;