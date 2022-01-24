import type { DivMode, DivType } from "../../../../Enums";
import type { IOptionLoader } from "../../IOptionLoader";
import type { SingleOrMultiple } from "../../../../Types/SingleOrMultiple";
export interface IDivEvent extends IOptionLoader<IDivEvent> {
    enable: boolean;
    mode: SingleOrMultiple<DivMode | string>;
    el: SingleOrMultiple<string>;
    elementId: SingleOrMultiple<string>;
    ids: SingleOrMultiple<string>;
    type: DivType;
}
