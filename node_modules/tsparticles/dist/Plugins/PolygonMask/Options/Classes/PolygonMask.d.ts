import type { IPolygonMask } from "../Interfaces/IPolygonMask";
import { Type } from "../../Enums/Type";
import { Draw } from "./Draw";
import { Move } from "./Move";
import { InlineArrangement } from "../../Enums/InlineArrangement";
import { Inline } from "./Inline";
import type { RecursivePartial } from "../../../../Types/RecursivePartial";
import type { ICoordinates } from "../../../../Core/Interfaces/ICoordinates";
import { LocalSvg } from "./LocalSvg";
export declare class PolygonMask implements IPolygonMask {
    get inlineArrangement(): InlineArrangement;
    set inlineArrangement(value: InlineArrangement);
    draw: Draw;
    enable: boolean;
    inline: Inline;
    move: Move;
    position?: ICoordinates;
    scale: number;
    type: Type;
    url?: string;
    data?: string | LocalSvg;
    constructor();
    load(data?: RecursivePartial<IPolygonMask>): void;
}
