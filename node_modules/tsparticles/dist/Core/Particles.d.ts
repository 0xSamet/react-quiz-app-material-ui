import { Container } from "./Container";
import type { ICoordinates } from "./Interfaces/ICoordinates";
import type { IMouseData } from "./Interfaces/IMouseData";
import type { IRgb } from "./Interfaces/IRgb";
import { Particle } from "./Particle";
import { QuadTree } from "../Utils";
import { RecursivePartial } from "../Types/RecursivePartial";
import { IParticles } from "../Options/Interfaces/Particles/IParticles";
export declare class Particles {
    private readonly container;
    get count(): number;
    array: Particle[];
    quadTree: QuadTree;
    pushing?: boolean;
    linksColor?: IRgb | string;
    linksColors: {
        [key: string]: IRgb | string | undefined;
    };
    grabLineColor?: IRgb | string;
    private interactionManager;
    constructor(container: Container);
    init(): void;
    redraw(): void;
    removeAt(index: number, quantity?: number): void;
    remove(particle: Particle): void;
    update(delta: number): void;
    draw(delta: number): void;
    clear(): void;
    push(nb: number, mousePosition?: IMouseData): void;
    addParticle(position?: ICoordinates, overrideOptions?: RecursivePartial<IParticles>): Particle;
    removeQuantity(quantity: number): void;
}
