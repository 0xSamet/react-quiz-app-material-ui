import { IShapeValues } from "./IShapeValues";
import { IOptionLoader } from "../../IOptionLoader";
export interface IStarShape extends IShapeValues, IOptionLoader<IStarShape> {
    nb_sides: number;
    sides: number;
    inset: number;
}
