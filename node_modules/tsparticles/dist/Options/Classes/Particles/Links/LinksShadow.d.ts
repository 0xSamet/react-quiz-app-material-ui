import type { ILinksShadow } from "../../../Interfaces/Particles/Links/ILinksShadow";
import type { RecursivePartial } from "../../../../Types/RecursivePartial";
import { OptionsColor } from "../../OptionsColor";
export declare class LinksShadow implements ILinksShadow {
    blur: number;
    color: OptionsColor;
    enable: boolean;
    constructor();
    load(data?: RecursivePartial<ILinksShadow>): void;
}
