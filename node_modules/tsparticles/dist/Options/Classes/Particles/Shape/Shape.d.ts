import type { IShape } from "../../../Interfaces/Particles/Shape/IShape";
import { ShapeType } from "../../../../Enums";
import type { RecursivePartial } from "../../../../Types/RecursivePartial";
import type { SingleOrMultiple } from "../../../../Types/SingleOrMultiple";
import { ShapeData } from "../../../../Types/ShapeData";
import { Stroke } from "../Stroke";
import { IPolygonShape } from "../../../Interfaces/Particles/Shape/IPolygonShape";
import { IImageShape } from "../../../Interfaces/Particles/Shape/IImageShape";
import { ICharacterShape } from "../../../Interfaces/Particles/Shape/ICharacterShape";
export declare class Shape implements IShape {
    get image(): SingleOrMultiple<IImageShape>;
    set image(value: SingleOrMultiple<IImageShape>);
    get custom(): ShapeData;
    set custom(value: ShapeData);
    get images(): IImageShape[];
    set images(value: IImageShape[]);
    get stroke(): SingleOrMultiple<Stroke>;
    set stroke(_value: SingleOrMultiple<Stroke>);
    get character(): SingleOrMultiple<ICharacterShape>;
    set character(value: SingleOrMultiple<ICharacterShape>);
    get polygon(): SingleOrMultiple<IPolygonShape>;
    set polygon(value: SingleOrMultiple<IPolygonShape>);
    type: SingleOrMultiple<ShapeType | string>;
    options: ShapeData;
    constructor();
    load(data?: RecursivePartial<IShape>): void;
    private loadShape;
}
