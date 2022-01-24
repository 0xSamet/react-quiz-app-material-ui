import type { IGrabLinks } from "../../../Interfaces/Interactivity/Modes/IGrabLinks";
import type { RecursivePartial } from "../../../../Types/RecursivePartial";
import { OptionsColor } from "../../OptionsColor";
export declare class GrabLinks implements IGrabLinks {
    opacity: number;
    color?: OptionsColor;
    constructor();
    load(data?: RecursivePartial<IGrabLinks>): void;
}
