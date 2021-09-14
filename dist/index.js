(function (factory) {
    if (typeof module === "object" && typeof module.exports === "object") {
        var v = factory(require, exports);
        if (v !== undefined) module.exports = v;
    }
    else if (typeof define === "function" && define.amd) {
        define(["require", "exports"], factory);
    }
})(function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var CharacterWarpSpeed = /** @class */ (function () {
        function CharacterWarpSpeed(element, characterSet) {
            var _this = this;
            // Rectangle properties
            this.width = 0;
            this.heigth = 0;
            this.center = { x: 0, y: 0 };
            // Center circle properties
            this.circleRadius = 100;
            // Style properties
            this.frequencyMin = 10;
            this.frequencyMax = 50;
            this.lifetimeMin = 2000;
            this.lifetimeMax = 5000;
            this.background = "black";
            this.color = "white";
            this.fontSizeMin = 3;
            this.fontSizeMax = 6;
            this.element = element;
            this.characterSet = characterSet;
            this.setStyles();
            this.SetSizeAttributes();
            window.onresize = function () {
                _this.SetSizeAttributes();
            };
            var self = this;
            var timeout = setTimeout(function c() {
                self.createChar();
                timeout = setTimeout(c, self.getFrequency());
            }, this.getFrequency());
        }
        CharacterWarpSpeed.prototype.setStyles = function () {
            this.element.style.overflow = "hidden";
            this.element.style.background = this.background;
            var style = document.querySelector("style") || document.createElement('style');
            document.head.removeChild(style);
            if (!style.innerText.includes(".charwarp-")) {
                style.innerHTML += "\n.charwarp-char {\n    position: absolute;\n    opacity: 0;\n}\n\n.charwarp-in {\n    opacity: 1;\n}";
            }
            document.head.appendChild(style);
        };
        CharacterWarpSpeed.prototype.SetSizeAttributes = function () {
            this.width = this.element.clientWidth;
            this.heigth = this.element.clientHeight;
            this.center.x = this.width / 2;
            this.center.y = this.heigth / 2;
        };
        CharacterWarpSpeed.prototype.getFrequency = function () {
            return Math.floor(Math.random() * (this.frequencyMax - this.frequencyMin + 1) + this.frequencyMin);
        };
        CharacterWarpSpeed.prototype.getLifetime = function () {
            return Math.floor(Math.random() * (this.lifetimeMax - this.lifetimeMin + 1) + this.lifetimeMin);
        };
        CharacterWarpSpeed.prototype.getCirclePointCoord = function () {
            var coordStart = { x: 0, y: 0 };
            var coordEnd = { x: 0, y: 0 };
            var angle = Math.floor(Math.random() * 721) - 360;
            coordStart.x = this.center.x + (this.circleRadius * Math.cos(angle));
            coordStart.y = this.center.y + (this.circleRadius * Math.sin(angle));
            coordEnd.x = (this.width / 2) * Math.cos(angle);
            coordEnd.y = (this.heigth / 2) * Math.sin(angle);
            return [coordStart, coordEnd];
        };
        CharacterWarpSpeed.prototype.getRandomChar = function () {
            var len = this.characterSet.length;
            var index = Math.floor(Math.random() * len);
            return this.characterSet[index];
        };
        CharacterWarpSpeed.prototype.getFontSize = function () {
            return Math.floor(Math.random() * (this.fontSizeMax - this.fontSizeMin + 1) + this.fontSizeMin) + "em";
        };
        CharacterWarpSpeed.prototype.createChar = function () {
            var char = this.getRandomChar();
            var coords = this.getCirclePointCoord();
            var charEl = document.createElement("p");
            charEl.innerText = char;
            charEl.classList.add("charwarp-char");
            charEl.style.top = coords[0].y + "px";
            charEl.style.left = coords[0].x + "px";
            charEl.style.color = this.color;
            charEl.style.fontSize = this.getFontSize();
            var duration = Math.max(1, this.getFrequency() / 1000);
            var lifetime = this.getLifetime();
            charEl.style.transition = "opacity " + duration + "s ease-in 0s, transform " + Math.round(lifetime / 1000 + duration) + "s ease-in";
            setTimeout(function () {
                charEl.classList.add("charwarp-in");
                charEl.style.transform = "translate(" + coords[1].x + "px, " + coords[1].y + "px)";
            }, 50);
            this.element.appendChild(charEl);
            setTimeout(this.destroyChar, lifetime, charEl);
        };
        CharacterWarpSpeed.prototype.destroyChar = function (charEl) {
            charEl.classList.remove("charwarp-in");
            charEl.ontransitionend = function (ev) {
                charEl.remove();
            };
        };
        return CharacterWarpSpeed;
    }());
    exports.default = CharacterWarpSpeed;
});
