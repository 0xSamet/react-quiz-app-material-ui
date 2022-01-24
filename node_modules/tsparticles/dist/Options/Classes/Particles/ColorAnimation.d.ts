import type { IColorAnimation } from "../../Interfaces/Particles/IColorAnimation";
import type { RecursivePartial } from "../../../Types/RecursivePartial";
export declare class ColorAnimation implements IColorAnimation {
    enable: boolean;
    speed: number;
    sync: boolean;
    constructor();
    load(data?: RecursivePartial<IColorAnimation>): void;
}
