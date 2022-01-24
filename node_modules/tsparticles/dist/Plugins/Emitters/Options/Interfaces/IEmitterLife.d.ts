import type { IOptionLoader } from "../../../../Options/Interfaces/IOptionLoader";
export interface IEmitterLife extends IOptionLoader<IEmitterLife> {
    count?: number;
    duration?: number;
    delay?: number;
}
