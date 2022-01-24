import type { IClickEvent } from "./IClickEvent";
import type { IHoverEvent } from "./IHoverEvent";
import type { IDivEvent } from "./IDivEvent";
import type { IOptionLoader } from "../../IOptionLoader";
import { SingleOrMultiple } from "../../../../Types/SingleOrMultiple";
export interface IEvents extends IOptionLoader<IEvents> {
    onclick: IClickEvent;
    onhover: IHoverEvent;
    ondiv: SingleOrMultiple<IDivEvent>;
    onClick: IClickEvent;
    onHover: IHoverEvent;
    onDiv: SingleOrMultiple<IDivEvent>;
    resize: boolean;
}
