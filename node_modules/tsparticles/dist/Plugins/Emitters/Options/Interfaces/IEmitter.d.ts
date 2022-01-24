import type { IOptionLoader } from "../../../../Options/Interfaces/IOptionLoader";
import type { ICoordinates } from "../../../../Core/Interfaces/ICoordinates";
import type { MoveDirection } from "../../../../Enums";
import type { IParticles } from "../../../../Options/Interfaces/Particles/IParticles";
import type { IEmitterRate } from "./IEmitterRate";
import type { IEmitterLife } from "./IEmitterLife";
import type { RecursivePartial } from "../../../../Types/RecursivePartial";
import type { IEmitterSize } from "./IEmitterSize";
export interface IEmitter extends IOptionLoader<IEmitter> {
    size?: IEmitterSize;
    direction: MoveDirection;
    life: IEmitterLife;
    particles?: RecursivePartial<IParticles>;
    position?: ICoordinates;
    rate: IEmitterRate;
}
