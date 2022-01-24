import type { IOptionLoader } from "../../../../Options/Interfaces/IOptionLoader";
import type { IDrawStroke } from "./IDrawStroke";
import type { IColor } from "../../../../Core/Interfaces/IColor";
export interface IDraw extends IOptionLoader<IDraw> {
    enable: boolean;
    lineColor: string | IColor;
    lineWidth: number;
    stroke: IDrawStroke;
}
