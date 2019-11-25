import CursorKeys from './CursorKeys.js';
import RadToDeg from '../math/RadToDeg.js';
import DIRMODE from '../math/angle/angletodirections/Const.js';
import AngleToDirections from '../math/angle/angletodirections/AngleToDirections.js';

const GetValue = Phaser.Utils.Objects.GetValue;
const GetDist = Phaser.Math.Distance.Between;
const GetAngle = Phaser.Math.Angle.Between;

class VectorToCursorKeys extends CursorKeys {
    constructor(config) {
        super();
        this.resetFromJSON(config);
    }

    resetFromJSON(o) {
        if (this.start == undefined) {
            this.start = {};
        }
        if (this.end == undefined) {
            this.end = {};
        }
        this.setEnable(GetValue(o, 'enable', true));
        this.setMode(GetValue(o, 'dir', '8dir'));
        this.setDistanceThreshold(GetValue(o, 'forceMin', 16));

        var startX = GetValue(o, "start.x", null);
        var startY = GetValue(o, "start.y", null);
        var endX = GetValue(o, "end.x", null);
        var endY = GetValue(o, "end.y", null);
        this.setVector(startX, startY, endX, endY);
        return this;
    }

    toJSON() {
        return {
            enable: this.enable,
            dir: this.dirMode,
            forceMin: this.forceMin,

            start: {
                x: this.start.x,
                y: this.start.y
            },
            end: {
                x: this.end.x,
                y: this.end.y
            }
        };
    }

    setMode(m) {
        if (typeof (m) === 'string') {
            m = DIRMODE[m];
        }
        this.dirMode = m;
        return this;
    }

    setEnable(e) {
        if (e == undefined) {
            e = true;
        } else {
            e = !!e;
        }
        if (e === this.enable) {
            return;
        }
        if (e === false) {
            this.clearVector();
        }
        this.enable = e;
        return this;
    }

    setDistanceThreshold(d) {
        if (d < 0) {
            d = 0;
        }
        this.forceMin = d;
        return this;
    }

    clearVector() {
        this.start.x = 0;
        this.start.y = 0;
        this.end.x = 0;
        this.end.y = 0;
        this.clearAllKeysState();
        return this;
    }

    setVector(x0, y0, x1, y1) {
        this.clearVector();
        if (!this.enable) {
            return this;
        }
        if (x0 === null) {
            return this;
        }

        if (x1 === undefined) {
            x1 = x0;
            x0 = 0;
            y1 = y0;
            y0 = 0;
        }
        this.start.x = x0;
        this.start.y = y0;
        this.end.x = x1;
        this.end.y = y1;
        if ((this.forceMin > 0) && (this.force < this.forceMin)) {
            return this;
        }

        var dirStates = AngleToDirections(this.angle, this.dirMode, true);
        for (var dir in dirStates) {
            if (dirStates[dir]) {
                this.setKeyState(dir, true);
            }
        }

        return this;
    }

    get forceX() {
        return this.end.x - this.start.x;
    }

    get forceY() {
        return this.end.y - this.start.y;
    }

    get force() {
        return GetDist(this.start.x, this.start.y, this.end.x, this.end.y);
    }

    get rotation() {
        return GetAngle(this.start.x, this.start.y, this.end.x, this.end.y);
    }

    get angle() {
        return RadToDeg(this.rotation); // -180 ~ 180
    }

    get octant() {
        var octant = 0;
        if (this.rightKeyDown) {
            octant = (this.downKeyDown) ? 45 : 0;
        } else if (this.downKeyDown) {
            octant = (this.leftKeyDown) ? 135 : 90;
        } else if (this.leftKeyDown) {
            octant = (this.upKeyDown) ? 225 : 180;
        } else if (this.upKeyDown) {
            octant = (this.rightKeyDown) ? 315 : 270;
        }
        return octant;
    }
}

export default VectorToCursorKeys;