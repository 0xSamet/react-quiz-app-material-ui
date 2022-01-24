import type { IRotate } from "../../../Interfaces/Particles/Rotate/IRotate";
import { RotateAnimation } from "./RotateAnimation";
import { RotateDirection } from "../../../../Enums";
import type { RecursivePartial } from "../../../../Types/RecursivePartial";
export declare class Rotate implements IRotate {
    animation: RotateAnimation;
    direction: RotateDirection;
    random: boolean;
    value: number;
    constructor();
    load(data?: RecursivePartial<IRotate>): void;
}
