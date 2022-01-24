import type { IRepulseBase } from "../../../Interfaces/Interactivity/Modes/IRepulseBase";
import type { RecursivePartial } from "../../../../Types/RecursivePartial";
import type { IRepulse } from "../../../Interfaces/Interactivity/Modes/IRepulse";
export declare abstract class RepulseBase implements IRepulseBase {
    distance: number;
    duration: number;
    speed: number;
    constructor();
    load(data?: RecursivePartial<IRepulse>): void;
}
