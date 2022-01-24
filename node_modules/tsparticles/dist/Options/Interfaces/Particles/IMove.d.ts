import type { IAttract } from "./IAttract";
import type { MoveDirection, OutMode } from "../../../Enums";
import type { IOptionLoader } from "../IOptionLoader";
import type { ITrail } from "./ITrail";
import { INoise } from "./Noise/INoise";
export interface IMove extends IOptionLoader<IMove> {
    angle: number;
    attract: IAttract;
    bounce: boolean;
    collisions: boolean;
    direction: MoveDirection;
    enable: boolean;
    noise: INoise;
    out_mode: OutMode;
    outMode: OutMode;
    warp: boolean;
    random: boolean;
    speed: number;
    straight: boolean;
    trail: ITrail;
    vibrate: boolean;
}
