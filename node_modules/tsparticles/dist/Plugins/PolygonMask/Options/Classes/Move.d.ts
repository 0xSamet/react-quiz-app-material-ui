import type { IMove } from "../Interfaces/IMove";
import type { RecursivePartial } from "../../../../Types/RecursivePartial";
import { MoveType } from "../../Enums/MoveType";
export declare class Move implements IMove {
    radius: number;
    type: MoveType;
    constructor();
    load(data?: RecursivePartial<IMove>): void;
}
