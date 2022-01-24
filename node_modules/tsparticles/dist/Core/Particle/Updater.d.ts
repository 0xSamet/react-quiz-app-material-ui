import type { Container } from "../Container";
import type { Particle } from "../Particle";
export declare class Updater {
    private readonly container;
    private readonly particle;
    private readonly mover;
    constructor(container: Container, particle: Particle);
    private static checkBounds;
    update(delta: number): void;
    private updateOpacity;
    private updateSize;
    private updateAngle;
    private updateColor;
    private fixOutOfCanvasPosition;
    private updateOutMode;
    private updateBounce;
}
