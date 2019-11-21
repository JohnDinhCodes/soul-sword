// modules are defined as an array
// [ module function, map of requires ]
//
// map of requires is short require name -> numeric require
//
// anything defined in a previous bundle is accessed via the
// orig method which is the require for previous bundles
parcelRequire = (function (modules, cache, entry, globalName) {
  // Save the require from previous bundle to this closure if any
  var previousRequire = typeof parcelRequire === 'function' && parcelRequire;
  var nodeRequire = typeof require === 'function' && require;

  function newRequire(name, jumped) {
    if (!cache[name]) {
      if (!modules[name]) {
        // if we cannot find the module within our internal map or
        // cache jump to the current global require ie. the last bundle
        // that was added to the page.
        var currentRequire = typeof parcelRequire === 'function' && parcelRequire;
        if (!jumped && currentRequire) {
          return currentRequire(name, true);
        }

        // If there are other bundles on this page the require from the
        // previous one is saved to 'previousRequire'. Repeat this as
        // many times as there are bundles until the module is found or
        // we exhaust the require chain.
        if (previousRequire) {
          return previousRequire(name, true);
        }

        // Try the node require function if it exists.
        if (nodeRequire && typeof name === 'string') {
          return nodeRequire(name);
        }

        var err = new Error('Cannot find module \'' + name + '\'');
        err.code = 'MODULE_NOT_FOUND';
        throw err;
      }

      localRequire.resolve = resolve;
      localRequire.cache = {};

      var module = cache[name] = new newRequire.Module(name);

      modules[name][0].call(module.exports, localRequire, module, module.exports, this);
    }

    return cache[name].exports;

    function localRequire(x){
      return newRequire(localRequire.resolve(x));
    }

    function resolve(x){
      return modules[name][1][x] || x;
    }
  }

  function Module(moduleName) {
    this.id = moduleName;
    this.bundle = newRequire;
    this.exports = {};
  }

  newRequire.isParcelRequire = true;
  newRequire.Module = Module;
  newRequire.modules = modules;
  newRequire.cache = cache;
  newRequire.parent = previousRequire;
  newRequire.register = function (id, exports) {
    modules[id] = [function (require, module) {
      module.exports = exports;
    }, {}];
  };

  var error;
  for (var i = 0; i < entry.length; i++) {
    try {
      newRequire(entry[i]);
    } catch (e) {
      // Save first error but execute all entries
      if (!error) {
        error = e;
      }
    }
  }

  if (entry.length) {
    // Expose entry point to Node, AMD or browser globals
    // Based on https://github.com/ForbesLindesay/umd/blob/master/template.js
    var mainExports = newRequire(entry[entry.length - 1]);

    // CommonJS
    if (typeof exports === "object" && typeof module !== "undefined") {
      module.exports = mainExports;

    // RequireJS
    } else if (typeof define === "function" && define.amd) {
     define(function () {
       return mainExports;
     });

    // <script>
    } else if (globalName) {
      this[globalName] = mainExports;
    }
  }

  // Override the current require with this new one
  parcelRequire = newRequire;

  if (error) {
    // throw error from earlier, _after updating parcelRequire_
    throw error;
  }

  return newRequire;
})({"modules/StartMenu.js":[function(require,module,exports) {
function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

var StartMenu =
/*#__PURE__*/
function () {
  function StartMenu(_ref) {
    var startBtn = _ref.startBtn,
        clickSound = _ref.clickSound,
        startWindow = _ref.startWindow;

    _classCallCheck(this, StartMenu);

    this.startBtn = startBtn;
    this.clickSound = clickSound;
    this.startWindow = startWindow;
  }

  _createClass(StartMenu, [{
    key: "startBtnClick",
    value: function startBtnClick(callback) {
      var _this = this;

      this.startBtn.addEventListener("click", function (e) {
        _this.clickSound.play();

        _this.startWindow.remove();

        callback();
      });
    }
  }]);

  return StartMenu;
}();

module.exports = StartMenu;
},{}],"modules/Stats.js":[function(require,module,exports) {
function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

var Stats =
/*#__PURE__*/
function () {
  function Stats() {
    var stats = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {
      strength: 0,
      speed: 0,
      toughness: 0,
      spiritualEnergy: 0,
      spiritualBarrier: 0
    };

    _classCallCheck(this, Stats);

    this.strength = stats.strength;
    this.speed = stats.speed;
    this.toughness = stats.toughness;
    this.spiritualEnergy = stats.spiritualEnergy;
    this.spiritualBarrier = stats.spiritualBarrier;
  }

  _createClass(Stats, [{
    key: "levelUpStat",
    value: function levelUpStat(_ref) {
      var skill = _ref.skill,
          amount = _ref.amount;
      this[skill] += amount;
    }
  }]);

  return Stats;
}();

module.exports = Stats;
},{}],"modules/Character.js":[function(require,module,exports) {
"use strict";

var _Stats2 = _interopRequireDefault(require("./Stats"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } return _assertThisInitialized(self); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

var Character =
/*#__PURE__*/
function (_Stats) {
  _inherits(Character, _Stats);

  function Character(_ref) {
    var _this;

    var name = _ref.name;

    _classCallCheck(this, Character);

    _this = _possibleConstructorReturn(this, _getPrototypeOf(Character).call(this));
    _this.name = name;
    _this.level = 1;
    _this.health = 10;
    return _this;
  }

  return Character;
}(_Stats2.default);

module.exports = Character;
},{"./Stats":"modules/Stats.js"}],"modules/CreationMenu.js":[function(require,module,exports) {
"use strict";

var _Character = _interopRequireDefault(require("./Character"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

var CreationMenu =
/*#__PURE__*/
function () {
  function CreationMenu(_ref) {
    var clickSound = _ref.clickSound,
        createWindow = _ref.createWindow,
        createMusic = _ref.createMusic,
        createForm = _ref.createForm;

    _classCallCheck(this, CreationMenu);

    this.clickSound = clickSound;
    this.createMusic = createMusic;
    this.createWindow = createWindow;
    this.createForm = createForm;
  }

  _createClass(CreationMenu, [{
    key: "showMenu",
    value: function showMenu() {
      this.createMusic.play();
      this.createWindow.classList.add("show-window");
    }
  }, {
    key: "formListener",
    value: function formListener(callback) {
      var _this = this;

      this.createForm.addEventListener("submit", function (e) {
        e.preventDefault();

        var input = _this.createForm.querySelector("input");

        var name = input.value;

        if (name.length > 0) {
          localStorage.setItem("MainCharacter", JSON.stringify(new _Character.default({
            name: name
          })));

          _this.createWindow.remove();

          callback();
        }
      });
    }
  }]);

  return CreationMenu;
}();

module.exports = CreationMenu;
},{"./Character":"modules/Character.js"}],"modules/SceneOne.js":[function(require,module,exports) {
function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

var SceneOne =
/*#__PURE__*/
function () {
  function SceneOne(_ref) {
    var sceneOneWindow = _ref.sceneOneWindow,
        sceneOneMusic = _ref.sceneOneMusic,
        sceneOneDialogue = _ref.sceneOneDialogue,
        blipSound = _ref.blipSound,
        sceneOneTextContainer = _ref.sceneOneTextContainer;

    _classCallCheck(this, SceneOne);

    this.sceneOneWindow = sceneOneWindow;
    this.sceneOneMusic = sceneOneMusic;
    this.sceneOneDialogue = sceneOneDialogue;
    this.blipSound = blipSound;
    this.sceneOneTextContainer = sceneOneTextContainer;
    this.timeouts = [];
  }

  _createClass(SceneOne, [{
    key: "clearTimeouts",
    value: function clearTimeouts() {
      var _iteratorNormalCompletion = true;
      var _didIteratorError = false;
      var _iteratorError = undefined;

      try {
        for (var _iterator = this.timeouts[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
          var timeout = _step.value;
          clearInterval(timeout);
        }
      } catch (err) {
        _didIteratorError = true;
        _iteratorError = err;
      } finally {
        try {
          if (!_iteratorNormalCompletion && _iterator.return != null) {
            _iterator.return();
          }
        } finally {
          if (_didIteratorError) {
            throw _iteratorError;
          }
        }
      }
    }
  }, {
    key: "showMenu",
    value: function showMenu() {
      var _this = this;

      var flame = this.sceneOneWindow.querySelector(".scene-one__flame");
      this.sceneOneMusic.play();
      this.sceneOneWindow.style.display = "block";
      setTimeout(function () {
        _this.sceneOneWindow.classList.add("show-window");

        flame.classList.add("fade-in");
      }, 1);
    }
  }, {
    key: "typeWriter",
    value: function typeWriter(line) {
      var _this2 = this;

      // Clear previous setTimeout if user clicks before text is done loading
      this.clearTimeouts();
      this.sceneOneTextContainer.innerHTML = ""; // Array of individual characters from line

      var arr = line.split(""); // Loops through each character and plays blip sound

      var _loop = function _loop(i) {
        var char = arr[i];

        _this2.timeouts.push(setTimeout(function () {
          var span = document.createElement("span");
          span.innerHTML = char;

          _this2.sceneOneTextContainer.appendChild(span); // this.blipSound.pause();


          _this2.blipSound.currentTime = 0;

          _this2.blipSound.play();
        }, i * 20)); // this.timeouts[i];

      };

      for (var i = 0; i < line.length; i++) {
        _loop(i);
      }
    }
  }, {
    key: "playDialogue",
    value: function playDialogue() {
      var _this3 = this;

      var counter = 1;

      if (counter === 1) {
        this.typeWriter(this.sceneOneDialogue["line1"]);
      }

      var keyLength = Object.keys(this.sceneOneDialogue).length;
      this.sceneOneWindow.addEventListener("click", function () {
        if (counter < keyLength) {
          var key = Object.keys(_this3.sceneOneDialogue)[counter];

          _this3.typeWriter(_this3.sceneOneDialogue[key]);

          counter++;
        } else {
          _this3.sceneOneWindow.removeEventListener("click", function () {
            return "";
          });

          _this3.sceneOneWindow.style.transition = "opacity 2s";
          _this3.sceneOneWindow.style.opacity = "0";
          _this3.sceneOneWindow.style.position = "absolute";

          for (var i = 0; i < _this3.sceneOneMusic.volume / .1; i++) {
            setTimeout(function () {
              _this3.sceneOneMusic.volume -= .1;
            }, i * 500);
          }

          setTimeout(function () {
            _this3.sceneOneWindow.remove();
          }, 5000);
        }
      });
    }
  }, {
    key: "playScene",
    value: function playScene() {
      this.showMenu();
      this.playDialogue();
    }
  }]);

  return SceneOne;
}();

module.exports = SceneOne;
},{}],"modules/MainUI.js":[function(require,module,exports) {
function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

var MainUI =
/*#__PURE__*/
function () {
  function MainUI(_ref) {
    var mainUIEl = _ref.mainUIEl,
        MainCharacter = _ref.MainCharacter;

    _classCallCheck(this, MainUI);

    this.mainUI = mainUIEl;
    this.profile = mainUIEl.querySelector(".main-UI__character-profile");
    this.profileImage = this.profile.querySelector(".main-UI__character-profile__card");
    this.statCard = this.profile.querySelector(".main-UI__character-profile__stats");
    this.mapImage = this.mainUI.querySelector(".main-UI__map-image");
    this.MainCharacter = MainCharacter;
    this.characterLevel = this.profileImage.querySelector(".main-UI__character-profile__level span");
    this.characterName = this.profileImage.querySelector(".main-UI__character-profile__character-name");
    this.speedStat = this.statCard.querySelector(".speed-stat");
    this.strengthStat = this.statCard.querySelector(".strength-stat");
    this.spiritualEnergyStat = this.statCard.querySelector(".spiritual-energy-stat");
    this.toughnessStat = this.statCard.querySelector(".toughness-stat");
    this.spiritualBarrierStat = this.statCard.querySelector(".spiritual-barrier-stat");
  }

  _createClass(MainUI, [{
    key: "init",
    value: function init() {
      this.showStats();
      this.showMenu();
      this.showMap();
      this.setStats();
    }
  }, {
    key: "setStats",
    value: function setStats() {
      this.characterName.innerHTML = this.MainCharacter.name;
      this.characterLevel.innerHTML = this.MainCharacter.level;
      this.speedStat.innerHTML = this.MainCharacter.speed;
      this.strengthStat.innerHTML = this.MainCharacter.strength;
      this.spiritualEnergyStat.innerHTML = this.MainCharacter.spiritualEnergy;
      this.toughnessStat.innerHTML = this.MainCharacter.toughness;
      this.spiritualBarrierStat.innerHTML = this.MainCharacter.spiritualBarrier;
    }
  }, {
    key: "showStats",
    value: function showStats() {
      var _this = this;

      this.profile.addEventListener("mouseover", function (e) {
        _this.profileImage.style.opacity = "0";
        _this.statCard.style.opacity = 1;
      });
      this.profile.addEventListener("mouseleave", function (e) {
        _this.profileImage.style.opacity = 1;
        _this.statCard.style.opacity = 0;
      });
    }
  }, {
    key: "showMap",
    value: function showMap() {
      this.mapImage.addEventListener("click", function () {
        // TODO
        console.log("Implement Different Map Locations Here");
      });
    }
  }, {
    key: "showMenu",
    value: function showMenu() {
      this.mainUI.classList.add("show-ui");
    }
  }]);

  return MainUI;
}();

module.exports = MainUI;
},{}],"modules/FirstBattle.js":[function(require,module,exports) {
function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

// TODO clean up this mess
var FirstBattle =
/*#__PURE__*/
function () {
  function FirstBattle(_ref) {
    var mainWindow = _ref.mainWindow,
        firstBattleData = _ref.firstBattleData,
        mainTextContainer = _ref.mainTextContainer,
        blipSound = _ref.blipSound,
        battleMusic = _ref.battleMusic;

    _classCallCheck(this, FirstBattle);

    this.mainWindow = mainWindow;
    this.firstBattleData = firstBattleData;
    this.part1Dialogue = firstBattleData.part1;
    this.mainTextContainer = mainTextContainer;
    this.blipSound = blipSound;
    this.timeouts = [];
    this.part1Buttons = firstBattleData.part1Buttons;
    this.buttonContainer = mainWindow.querySelector(".main-screen__button-container");
    this.battleMusic = battleMusic;
  }

  _createClass(FirstBattle, [{
    key: "init",
    value: function init() {
      this.playDialogue(this.mainWindow, this.part1Dialogue, this.mainTextContainer, this.blipSound);
      this.battleMusic.play();
    }
  }, {
    key: "clearTimeouts",
    value: function clearTimeouts() {
      var _iteratorNormalCompletion = true;
      var _didIteratorError = false;
      var _iteratorError = undefined;

      try {
        for (var _iterator = this.timeouts[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
          var timeout = _step.value;
          clearInterval(timeout);
        }
      } catch (err) {
        _didIteratorError = true;
        _iteratorError = err;
      } finally {
        try {
          if (!_iteratorNormalCompletion && _iterator.return != null) {
            _iterator.return();
          }
        } finally {
          if (_didIteratorError) {
            throw _iteratorError;
          }
        }
      }
    }
  }, {
    key: "option1",
    value: function option1() {
      var _this = this;

      this.mainWindow.querySelector("#option-1").addEventListener("click", function (e) {
        _this.buttonContainer.innerHTML = "";
        _this.mainTextContainer.innerHTML = "";

        _this.clearTimeouts();

        _this.playDialogue(_this.mainWindow, _this.firstBattleData.searchForParents, _this.mainTextContainer, _this.blipSound);
      });
    }
  }, {
    key: "option2",
    value: function option2() {
      var _this2 = this;

      this.mainWindow.querySelector("#option-2").addEventListener("click", function (e) {
        _this2.buttonContainer.innerHTML = "";
        _this2.mainTextContainer.innerHTML = "";
        console.log("do something for option 2 here");

        _this2.clearTimeouts();
      });
    }
  }, {
    key: "buttons",
    value: function buttons() {
      for (var i = 0; i < this.part1Buttons.length; i++) {
        var button = document.createElement("button");
        button.innerHTML = this.part1Buttons[i];
        button.setAttribute("id", "option-".concat(i + 1));
        this.buttonContainer.appendChild(button);
      }

      this.option1();
      this.option2();
    }
  }, {
    key: "typeWriter",
    value: function typeWriter(line, textContainer, blipSound) {
      var _this3 = this;

      // Clear previous setTimeout if user clicks before text is done loading
      this.clearTimeouts();
      textContainer.innerHTML = ""; // Array of individual characters from line

      var arr = line.split(""); // Loops through each character and plays blip sound

      var _loop = function _loop(i) {
        var char = arr[i];

        _this3.timeouts.push(setTimeout(function () {
          var span = document.createElement("span");
          span.innerHTML = char;
          textContainer.appendChild(span); // blipSound.pause();

          blipSound.currentTime = 0;
          blipSound.play();
        }, i * 20));

        _this3.timeouts[i];
      };

      for (var i = 0; i < line.length; i++) {
        _loop(i);
      }
    }
  }, {
    key: "playDialogue",
    value: function playDialogue(mainWindow, dialogue, textContainer, blipSound) {
      var _this4 = this;

      var counter = 1;
      var firstLine = Object.keys(dialogue)[0];

      if (counter === 1) {
        this.typeWriter(dialogue[firstLine], textContainer, blipSound);
      }

      var keyLength = Object.keys(dialogue).length;
      mainWindow.addEventListener("click", function () {
        if (counter < keyLength) {
          var key = Object.keys(dialogue)[counter];

          _this4.typeWriter(dialogue[key], textContainer, blipSound);

          if (counter === keyLength - 1) {
            _this4.buttons();
          }

          ;
          counter++;
        }
      });
    }
  }]);

  return FirstBattle;
}();

module.exports = FirstBattle;
},{}],"index.js":[function(require,module,exports) {
"use strict";

var _StartMenu = _interopRequireDefault(require("./modules/StartMenu"));

var _CreationMenu = _interopRequireDefault(require("./modules/CreationMenu"));

var _SceneOne = _interopRequireDefault(require("./modules/SceneOne"));

var _MainUI = _interopRequireDefault(require("./modules/MainUI"));

var _FirstBattle = _interopRequireDefault(require("./modules/FirstBattle"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

// Global Sounds
var clickSound = document.querySelector(".click-sound");
var blipSound = document.querySelector(".blip-sound"); // Music

var battleMusic = document.querySelector(".battle-music"); // All Images

var imgs = document.querySelectorAll("img"); // Game Div

var gameWindow = document.querySelector(".game"); // Start Window Elements

var startWindow = gameWindow.querySelector(".start");
var startBtn = startWindow.querySelector("button"); // Character Creation Window Elements

var createWindow = gameWindow.querySelector(".creation");
var createMusic = createWindow.querySelector("audio");
createMusic.loop = true;
createMusic.currentTime = 5;
var createForm = createWindow.querySelector(".creation__input-form"); // Main Elements

var mainUIEl = gameWindow.querySelector(".main-UI");
var mainWindow = gameWindow.querySelector(".main-screen__window");
var mainTextContainer = mainWindow.querySelector(".main-screen__text-container");
var MainCharacter = JSON.parse(localStorage.getItem("MainCharacter")) || null; // Scene One Elements 

var sceneOneWindow = gameWindow.querySelector(".scene-one");
var sceneOneMusic = sceneOneWindow.querySelector("audio");
sceneOneMusic.loop = true;
sceneOneMusic.currentTime = 15;
var sceneOneTextContainer = sceneOneWindow.querySelector(".text-container");
var sceneOneDialogue = {
  line1: "At a time before humans were born with souls",
  line2: "Your existence amounted to your skill for survival",
  line3: "Swordsmanship",
  line4: "Spiritual Energy",
  line5: "Hand to hand combat",
  line6: "These core skills were the starting point to a long life",
  line7: "You had to master it all in order to achieve what every human innately desired",
  line8: "Surviving for the chance to encounter the soul sword",
  line9: "Will you be able to achieve the human race's dream?" // First Battle 

};
var firstBattleData = {
  part1: {
    line1: "Your parents have disappeared while you were out foraging for food",
    line2: "The other villagers of Yonato have no idea what had happen",
    line3: "It's getting late, the sun is setting soon",
    line4: "Do you want to search for your parents now? Or should you wait until sunrise?"
  },
  part1Buttons: ["Search for your parents", "Wait until sunrise"],
  searchForParents: {
    line1: "Let the yeeting commence",
    //TODO add dialogue for this choice
    line2: "You have been yeeted"
  }
};
var testData = {
  button1: {
    text: "Search for your parents",
    dialogue: {
      line1: ""
    }
  } // Initial Modules

};
var startMenu = new _StartMenu.default({
  startBtn: startBtn,
  clickSound: clickSound,
  startWindow: startWindow
});
var createMenu = new _CreationMenu.default({
  clickSound: clickSound,
  createWindow: createWindow,
  createMusic: createMusic,
  createForm: createForm
});
var sceneOne = new _SceneOne.default({
  sceneOneWindow: sceneOneWindow,
  sceneOneMusic: sceneOneMusic,
  sceneOneDialogue: sceneOneDialogue,
  sceneOneTextContainer: sceneOneTextContainer,
  blipSound: blipSound
});
var mainUI = new _MainUI.default({
  mainUIEl: mainUIEl,
  MainCharacter: MainCharacter
});
var firstBattle = new _FirstBattle.default({
  mainWindow: mainWindow,
  firstBattleData: firstBattleData,
  mainTextContainer: mainTextContainer,
  blipSound: blipSound,
  battleMusic: battleMusic
}); // Disables user drag on images

imgs.forEach(function (img) {
  img.draggable = false;
});
startMenu.startBtnClick(function () {
  if (!MainCharacter) {
    createMenu.showMenu();
    createMenu.formListener(function () {
      sceneOne.playScene();
    });
  } else {
    console.log("Get Scene from Local Storage");
    mainUI.init();
    firstBattle.init(); // sceneOne.playScene();
  }
});
},{"./modules/StartMenu":"modules/StartMenu.js","./modules/CreationMenu":"modules/CreationMenu.js","./modules/SceneOne":"modules/SceneOne.js","./modules/MainUI":"modules/MainUI.js","./modules/FirstBattle":"modules/FirstBattle.js"}],"../../../../usr/lib/node_modules/parcel-bundler/src/builtins/hmr-runtime.js":[function(require,module,exports) {
var global = arguments[3];
var OVERLAY_ID = '__parcel__error__overlay__';
var OldModule = module.bundle.Module;

function Module(moduleName) {
  OldModule.call(this, moduleName);
  this.hot = {
    data: module.bundle.hotData,
    _acceptCallbacks: [],
    _disposeCallbacks: [],
    accept: function (fn) {
      this._acceptCallbacks.push(fn || function () {});
    },
    dispose: function (fn) {
      this._disposeCallbacks.push(fn);
    }
  };
  module.bundle.hotData = null;
}

module.bundle.Module = Module;
var checkedAssets, assetsToAccept;
var parent = module.bundle.parent;

if ((!parent || !parent.isParcelRequire) && typeof WebSocket !== 'undefined') {
  var hostname = "" || location.hostname;
  var protocol = location.protocol === 'https:' ? 'wss' : 'ws';
  var ws = new WebSocket(protocol + '://' + hostname + ':' + "37485" + '/');

  ws.onmessage = function (event) {
    checkedAssets = {};
    assetsToAccept = [];
    var data = JSON.parse(event.data);

    if (data.type === 'update') {
      var handled = false;
      data.assets.forEach(function (asset) {
        if (!asset.isNew) {
          var didAccept = hmrAcceptCheck(global.parcelRequire, asset.id);

          if (didAccept) {
            handled = true;
          }
        }
      }); // Enable HMR for CSS by default.

      handled = handled || data.assets.every(function (asset) {
        return asset.type === 'css' && asset.generated.js;
      });

      if (handled) {
        console.clear();
        data.assets.forEach(function (asset) {
          hmrApply(global.parcelRequire, asset);
        });
        assetsToAccept.forEach(function (v) {
          hmrAcceptRun(v[0], v[1]);
        });
      } else {
        window.location.reload();
      }
    }

    if (data.type === 'reload') {
      ws.close();

      ws.onclose = function () {
        location.reload();
      };
    }

    if (data.type === 'error-resolved') {
      console.log('[parcel] ✨ Error resolved');
      removeErrorOverlay();
    }

    if (data.type === 'error') {
      console.error('[parcel] 🚨  ' + data.error.message + '\n' + data.error.stack);
      removeErrorOverlay();
      var overlay = createErrorOverlay(data);
      document.body.appendChild(overlay);
    }
  };
}

function removeErrorOverlay() {
  var overlay = document.getElementById(OVERLAY_ID);

  if (overlay) {
    overlay.remove();
  }
}

function createErrorOverlay(data) {
  var overlay = document.createElement('div');
  overlay.id = OVERLAY_ID; // html encode message and stack trace

  var message = document.createElement('div');
  var stackTrace = document.createElement('pre');
  message.innerText = data.error.message;
  stackTrace.innerText = data.error.stack;
  overlay.innerHTML = '<div style="background: black; font-size: 16px; color: white; position: fixed; height: 100%; width: 100%; top: 0px; left: 0px; padding: 30px; opacity: 0.85; font-family: Menlo, Consolas, monospace; z-index: 9999;">' + '<span style="background: red; padding: 2px 4px; border-radius: 2px;">ERROR</span>' + '<span style="top: 2px; margin-left: 5px; position: relative;">🚨</span>' + '<div style="font-size: 18px; font-weight: bold; margin-top: 20px;">' + message.innerHTML + '</div>' + '<pre>' + stackTrace.innerHTML + '</pre>' + '</div>';
  return overlay;
}

function getParents(bundle, id) {
  var modules = bundle.modules;

  if (!modules) {
    return [];
  }

  var parents = [];
  var k, d, dep;

  for (k in modules) {
    for (d in modules[k][1]) {
      dep = modules[k][1][d];

      if (dep === id || Array.isArray(dep) && dep[dep.length - 1] === id) {
        parents.push(k);
      }
    }
  }

  if (bundle.parent) {
    parents = parents.concat(getParents(bundle.parent, id));
  }

  return parents;
}

function hmrApply(bundle, asset) {
  var modules = bundle.modules;

  if (!modules) {
    return;
  }

  if (modules[asset.id] || !bundle.parent) {
    var fn = new Function('require', 'module', 'exports', asset.generated.js);
    asset.isNew = !modules[asset.id];
    modules[asset.id] = [fn, asset.deps];
  } else if (bundle.parent) {
    hmrApply(bundle.parent, asset);
  }
}

function hmrAcceptCheck(bundle, id) {
  var modules = bundle.modules;

  if (!modules) {
    return;
  }

  if (!modules[id] && bundle.parent) {
    return hmrAcceptCheck(bundle.parent, id);
  }

  if (checkedAssets[id]) {
    return;
  }

  checkedAssets[id] = true;
  var cached = bundle.cache[id];
  assetsToAccept.push([bundle, id]);

  if (cached && cached.hot && cached.hot._acceptCallbacks.length) {
    return true;
  }

  return getParents(global.parcelRequire, id).some(function (id) {
    return hmrAcceptCheck(global.parcelRequire, id);
  });
}

function hmrAcceptRun(bundle, id) {
  var cached = bundle.cache[id];
  bundle.hotData = {};

  if (cached) {
    cached.hot.data = bundle.hotData;
  }

  if (cached && cached.hot && cached.hot._disposeCallbacks.length) {
    cached.hot._disposeCallbacks.forEach(function (cb) {
      cb(bundle.hotData);
    });
  }

  delete bundle.cache[id];
  bundle(id);
  cached = bundle.cache[id];

  if (cached && cached.hot && cached.hot._acceptCallbacks.length) {
    cached.hot._acceptCallbacks.forEach(function (cb) {
      cb();
    });

    return true;
  }
}
},{}]},{},["../../../../usr/lib/node_modules/parcel-bundler/src/builtins/hmr-runtime.js","index.js"], null)
//# sourceMappingURL=/soul-sword.e31bb0bc.js.map