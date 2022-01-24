import type { IOptionsColor } from "../Interfaces/IOptionsColor";
import type { IValueColor } from "../../Core/Interfaces/IValueColor";
import type { RecursivePartial } from "../../Types/RecursivePartial";
import type { IRgb } from "../../Core/Interfaces/IRgb";
import type { IHsl } from "../../Core/Interfaces/IHsl";
import { SingleOrMultiple } from "../../Types/SingleOrMultiple";
export declare class OptionsColor implements IOptionsColor {
    value: SingleOrMultiple<string | IValueColor | IRgb | IHsl>;
    constructor();
    static create(source?: OptionsColor, data?: string | RecursivePartial<IOptionsColor>): OptionsColor;
    load(data?: RecursivePartial<IOptionsColor>): void;
}
