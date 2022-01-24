import type { IColor } from "../Core/Interfaces/IColor";
import type { IRgb } from "../Core/Interfaces/IRgb";
import type { IRgba } from "../Core/Interfaces/IRgba";
import type { IHsl } from "../Core/Interfaces/IHsl";
import type { IHsla } from "../Core/Interfaces/IHsla";
export declare class ColorUtils {
    static colorToRgb(input?: string | IColor): IRgb | undefined;
    static colorToHsl(color: IColor): IHsl | undefined;
    static rgbToHsl(color: IRgb): IHsl;
    static stringToAlpha(input: string): number | undefined;
    static stringToRgb(input: string): IRgb | undefined;
    static hslToRgb(hsl: IHsl): IRgb;
    static hslaToRgba(hsla: IHsla): IRgba;
    static getRandomRgbColor(min?: number): IRgb;
    static getStyleFromRgb(color: IRgb, opacity?: number): string;
    static getStyleFromHsl(color: IHsl, opacity?: number): string;
    static mix(color1: IRgb | IHsl, color2: IRgb | IHsl, size1: number, size2: number): IRgb;
    private static hue2rgb;
    private static stringToRgba;
}
