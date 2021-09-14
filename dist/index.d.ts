interface coordinates {
    x: number;
    y: number;
}
export default class CharacterWarp {
    element: HTMLElement;
    characterSet: string[];
    width: number;
    heigth: number;
    center: coordinates;
    circleRadius: number;
    frequencyMin: number;
    frequencyMax: number;
    lifetimeMin: number;
    lifetimeMax: number;
    background: string;
    color: string;
    fontSizeMin: number;
    fontSizeMax: number;
    constructor(element: HTMLElement, characterSet: string[]);
    private setStyles;
    private SetSizeAttributes;
    private getFrequency;
    private getLifetime;
    private getCirclePointCoord;
    private getRandomChar;
    private getFontSize;
    private createChar;
    private destroyChar;
}
export {};
