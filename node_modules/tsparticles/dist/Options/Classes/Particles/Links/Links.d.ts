import type { ILinks } from "../../../Interfaces/Particles/Links/ILinks";
import { LinksShadow } from "./LinksShadow";
import type { RecursivePartial } from "../../../../Types/RecursivePartial";
import { LinksTriangle } from "./LinksTriangle";
import { OptionsColor } from "../../OptionsColor";
export declare class Links implements ILinks {
    id?: string;
    blink: boolean;
    color: OptionsColor;
    consent: boolean;
    distance: number;
    enable: boolean;
    opacity: number;
    shadow: LinksShadow;
    triangles: LinksTriangle;
    width: number;
    warp: boolean;
    constructor();
    load(data?: RecursivePartial<ILinks>): void;
}
