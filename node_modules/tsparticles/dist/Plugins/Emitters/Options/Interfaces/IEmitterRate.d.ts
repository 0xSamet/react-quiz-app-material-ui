import type { IOptionLoader } from "../../../../Options/Interfaces/IOptionLoader";
export interface IEmitterRate extends IOptionLoader<IEmitterRate> {
    delay: number;
    quantity: number;
}
