import type { IInline } from "../Interfaces/IInline";
import { InlineArrangement } from "../../Enums/InlineArrangement";
import type { RecursivePartial } from "../../../../Types/RecursivePartial";
export declare class Inline implements IInline {
    arrangement: InlineArrangement;
    constructor();
    load(data?: RecursivePartial<IInline>): void;
}
