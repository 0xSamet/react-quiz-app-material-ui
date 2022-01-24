import type { Particle } from "../../../Particle";
import type { Container } from "../../../Container";
import type { IParticlesInteractor } from "../../../Interfaces/IParticlesInteractor";
export declare class Infecter implements IParticlesInteractor {
    private readonly container;
    constructor(container: Container);
    isEnabled(): boolean;
    reset(): void;
    interact(p1: Particle, delta: number): void;
}
