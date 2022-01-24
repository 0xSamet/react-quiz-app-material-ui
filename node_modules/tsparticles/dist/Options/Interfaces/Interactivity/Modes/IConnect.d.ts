import type { IConnectLinks } from "./IConnectLinks";
import type { IOptionLoader } from "../../IOptionLoader";
export interface IConnect extends IOptionLoader<IConnect> {
    distance: number;
    line_linked: IConnectLinks;
    lineLinked: IConnectLinks;
    links: IConnectLinks;
    radius: number;
}
