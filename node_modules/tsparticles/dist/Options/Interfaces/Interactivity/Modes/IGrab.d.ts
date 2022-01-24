import type { IGrabLinks } from "./IGrabLinks";
import type { IOptionLoader } from "../../IOptionLoader";
export interface IGrab extends IOptionLoader<IGrab> {
    distance: number;
    line_linked: IGrabLinks;
    lineLinked: IGrabLinks;
    links: IGrabLinks;
}
