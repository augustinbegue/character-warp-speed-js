interface coordinates {
    x: number,
    y: number
}

export default class CharacterWarpSpeed {
    element: HTMLElement;
    characterSet: string[];

    // Rectangle properties
    width: number = 0;
    heigth: number = 0;
    center: coordinates = { x: 0, y: 0 };

    // Center circle properties
    circleRadius: number = 100;

    // Style properties
    frequencyMin: number = 10;
    frequencyMax: number = 50;
    lifetimeMin: number = 2_000;
    lifetimeMax: number = 5_000;
    background: string = "black";
    color: string = "white";
    fontSizeMin: number = 3;
    fontSizeMax: number = 6;

    constructor(element: HTMLElement, characterSet: string[]) {
        this.element = element;
        this.characterSet = characterSet;

        this.setStyles()
        this.SetSizeAttributes()
        window.onresize = () => {
            this.SetSizeAttributes()
        };

        let self = this;
        let timeout = setTimeout(function c() {
            self.createChar()

            timeout = setTimeout(c, self.getFrequency())
        }, this.getFrequency())
    }

    private setStyles() {
        this.element.style.overflow = "hidden"
        this.element.style.background = this.background;

        var style = document.querySelector("style") || document.createElement('style');
        document.head.removeChild(style);

        if (!style.innerText.includes(".charwarp-")) {
            style.innerHTML += `
.charwarp-char {
    position: absolute;
    opacity: 0;
}

.charwarp-in {
    opacity: 1;
}`;
        }

        document.head.appendChild(style);
    }

    private SetSizeAttributes() {
        this.width = this.element.clientWidth;
        this.heigth = this.element.clientHeight;
        this.center.x = this.width / 2;
        this.center.y = this.heigth / 2;
    }

    private getFrequency() {
        return Math.floor(Math.random() * (this.frequencyMax - this.frequencyMin + 1) + this.frequencyMin);
    }

    private getLifetime() {
        return Math.floor(Math.random() * (this.lifetimeMax - this.lifetimeMin + 1) + this.lifetimeMin);
    }

    private getCirclePointCoord(): coordinates[] {
        let coordStart: coordinates = { x: 0, y: 0 };
        let coordEnd: coordinates = { x: 0, y: 0 };

        let angle = Math.floor(Math.random() * 721) - 360;

        coordStart.x = this.center.x + (this.circleRadius * Math.cos(angle))
        coordStart.y = this.center.y + (this.circleRadius * Math.sin(angle))

        coordEnd.x = (this.width / 2) * Math.cos(angle);
        coordEnd.y = (this.heigth / 2) * Math.sin(angle);

        return [coordStart, coordEnd];
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

        const charEl = document.createElement("p");
        charEl.innerText = char;
        charEl.classList.add("charwarp-char");

        charEl.style.top = coords[0].y + "px";
        charEl.style.left = coords[0].x + "px";
        charEl.style.color = this.color;
        charEl.style.fontSize = this.getFontSize();
        let duration = Math.max(1, this.getFrequency() / 1000);
        let lifetime = this.getLifetime();
        charEl.style.transition = `opacity ${duration}s ease-in 0s, transform ${Math.round(lifetime / 1000 + duration)}s ease-in`;
        setTimeout(() => {
            charEl.classList.add("charwarp-in");
            charEl.style.transform = `translate(${coords[1].x}px, ${coords[1].y}px)`;
        }, 50)

        this.element.appendChild(charEl);

        setTimeout(this.destroyChar, lifetime, charEl)
    }

    private destroyChar(charEl: HTMLElement) {
        charEl.classList.remove("charwarp-in")
        charEl.ontransitionend = (ev: Event) => {
            charEl.remove()
        }
    }
}