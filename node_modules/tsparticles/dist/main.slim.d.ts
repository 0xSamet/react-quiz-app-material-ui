import { RecursivePartial } from "./Types/RecursivePartial";
import { IOptions } from "./Options/Interfaces/IOptions";
import { Container } from "./Core/Container";
import { IShapeDrawer } from "./Core/Interfaces/IShapeDrawer";
import { ShapeDrawerAfterEffectFunction, ShapeDrawerDestroyFunction, ShapeDrawerDrawFunction, ShapeDrawerInitFunction } from "./Types/ShapeDrawerFunctions";
import { IPlugin } from "./Core/Interfaces/IPlugin";
export declare class MainSlim {
    private initialized;
    constructor();
    init(): void;
    loadFromArray(tagId: string, params: RecursivePartial<IOptions>[], index?: number): Promise<Container | undefined>;
    load(tagId: string, params: RecursivePartial<IOptions>): Promise<Container | undefined>;
    loadJSON(tagId: string, pathConfigJson: string): Promise<Container | undefined>;
    setOnClickHandler(callback: EventListenerOrEventListenerObject): void;
    dom(): Container[];
    domItem(index: number): Container | undefined;
    addShape(shape: string, drawer: IShapeDrawer | ShapeDrawerDrawFunction, init?: ShapeDrawerInitFunction, afterEffect?: ShapeDrawerAfterEffectFunction, destroy?: ShapeDrawerDestroyFunction): void;
    addPreset(preset: string, options: RecursivePartial<IOptions>): void;
    addPlugin(plugin: IPlugin): void;
}
