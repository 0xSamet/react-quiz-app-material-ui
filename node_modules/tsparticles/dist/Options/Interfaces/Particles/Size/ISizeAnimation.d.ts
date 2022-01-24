import type { IOptionLoader } from "../../IOptionLoader";
import type { DestroyType, StartValueType } from "../../../../Enums";
export interface ISizeAnimation extends IOptionLoader<ISizeAnimation> {
    enable: boolean;
    size_min: number;
    minimumValue: number;
    speed: number;
    sync: boolean;
    startValue: StartValueType;
    destroy: DestroyType;
}
