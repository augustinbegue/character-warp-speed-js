interface coordinates {
    x: number,
    y: number
}

export class CharacterWarp {
    element: HTMLElement;
    characterSet: string[];

    // Rectangle properties
    width: number;
    heigth: number;
    center: coordinates = { x: 0, y: 0 };

    // Center circle properties
    circleRadius: number;

    // Style properties
    frequencyMin: number = 100;
    frequencyMax: number = 500;
    lifetimeMin: number = 5_000;
    lifetimeMax: number = 10_000;
    background: string = "black";
    color: string = "white";
    fontSizeMin: number = 3;
    fontSizeMax: number = 6;

    // Char Creation Timeout


    constructor(element: HTMLElement, characterSet: string[]) {
        this.element = element;
        this.characterSet = characterSet;

        this.width = element.clientWidth;
        this.heigth = element.clientHeight;
        this.center.x = this.width / 2;
        this.center.y = this.heigth / 2;

        this.circleRadius = Math.min(this.width, this.heigth) / 6;

        this.element.style.background = this.background;

        let self = this;
        let timeout = setTimeout(function c() {
            self.createChar()

            timeout = setTimeout(c, self.getFrequency())
        }, this.getFrequency())
    }

    private getFrequency() {
        return Math.floor(Math.random() * (this.frequencyMax - this.frequencyMin + 1) + this.frequencyMin);
    }

    private getLifetime() {
        return Math.floor(Math.random() * (this.lifetimeMax - this.lifetimeMin + 1) + this.lifetimeMin);
    }

    private getCirclePointCoord(): coordinates {
        let coords: coordinates = { x: 0, y: 0 };

        let angle = Math.floor(Math.random() * 721) - 360;

        coords.x = this.center.x + (this.circleRadius * Math.cos(angle))
        coords.y = this.center.y + (this.circleRadius * Math.sin(angle))

        return coords;
    }

    private getRandomChar(): string {
        let len = this.characterSet.length;
        let index = Math.floor(Math.random() * len);

        return this.characterSet[index];
    }

    private getFontSize() {
        return Math.floor(Math.random() * (this.fontSizeMax - this.fontSizeMin + 1) + this.fontSizeMin) + "em";
    }

    private createChar() {
        let char = this.getRandomChar();
        let coords = this.getCirclePointCoord();

        const charEl = document.createElement("span");
        charEl.innerText = char;
        charEl.classList.add("char");

        charEl.style.top = coords.y + "px";
        charEl.style.left = coords.x + "px";
        charEl.style.color = this.color;
        charEl.style.fontSize = this.getFontSize();
        let duration = Math.max(1, this.getFrequency() / 1000);
        charEl.style.transition = "opacity " + duration + "s ease-in 0s";
        setTimeout(() => {
            charEl.classList.add("in");
        }, 50)

        this.element.appendChild(charEl);

        setTimeout(this.destroyChar, this.getLifetime(), charEl)
    }

    private destroyChar(charEl: HTMLElement) {
        charEl.classList.remove("in")
        charEl.ontransitionend = (ev: Event) => {
            charEl.remove()
        }
    }
}

function setStyles() {
    var style = document.createElement('style');
    style.innerHTML = `
.char {
    position: absolute;
    opacity: 0;
}

.in {
    opacity: 1;
}
`;
    document.head.appendChild(style);

}

window.onload = (ev: Event) => {
    setStyles();

    let el = document.getElementById("characterWarp");

    if (el) {
        new CharacterWarp(el, ["1", "2", "3", "4", "5", "6", "7", "8", "9"]);
    }
}