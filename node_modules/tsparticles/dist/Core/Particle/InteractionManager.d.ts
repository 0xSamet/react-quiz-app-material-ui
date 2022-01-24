import { Container } from "../Container";
export declare class InteractionManager {
    private readonly container;
    private readonly externalInteractors;
    private readonly particleInteractors;
    constructor(container: Container);
    init(): void;
    interact(delta: number): void;
    private externalInteract;
    private particlesInteract;
}
