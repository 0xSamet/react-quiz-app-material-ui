import type { ICollisions } from "../../Interfaces/Particles/ICollisions";
import { CollisionMode } from "../../../Enums";
import type { RecursivePartial } from "../../../Types/RecursivePartial";
export declare class Collisions implements ICollisions {
    enable: boolean;
    mode: CollisionMode;
    constructor();
    load(data?: RecursivePartial<ICollisions>): void;
}
