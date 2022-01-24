import type { Container } from "../Container";
import type { Particle } from "../Particle";
export declare class Mover {
    private readonly container;
    private readonly particle;
    constructor(container: Container, particle: Particle);
    move(delta: number): void;
    private moveParticle;
    private applyNoise;
    private moveParallax;
    private getProximitySpeedFactor;
}
