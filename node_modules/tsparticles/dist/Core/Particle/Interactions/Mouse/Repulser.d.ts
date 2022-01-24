import type { Container } from "../../../Container";
import { IExternalInteractor } from "../../../Interfaces/IExternalInteractor";
export declare class Repulser implements IExternalInteractor {
    private readonly container;
    constructor(container: Container);
    isEnabled(): boolean;
    reset(): void;
    interact(): void;
    private singleDivRepulse;
    private hoverRepulse;
    private processRepulse;
    private clickRepulse;
    private processClickRepulse;
}
