import type { IMove } from "../../Interfaces/Particles/IMove";
import { Attract } from "./Attract";
import { MoveDirection, OutMode } from "../../../Enums";
import { Trail } from "./Trail";
import type { RecursivePartial } from "../../../Types/RecursivePartial";
import { Noise } from "./Noise/Noise";
export declare class Move implements IMove {
    get collisions(): boolean;
    set collisions(value: boolean);
    get bounce(): boolean;
    set bounce(value: boolean);
    get out_mode(): OutMode;
    set out_mode(value: OutMode);
    angle: number;
    attract: Attract;
    direction: MoveDirection;
    enable: boolean;
    noise: Noise;
    outMode: OutMode;
    random: boolean;
    speed: number;
    straight: boolean;
    trail: Trail;
    vibrate: boolean;
    warp: boolean;
    constructor();
    load(data?: RecursivePartial<IMove>): void;
}
