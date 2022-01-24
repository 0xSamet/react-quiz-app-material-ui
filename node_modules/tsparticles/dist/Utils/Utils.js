"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Utils = void 0;
const Enums_1 = require("../Enums");
const ColorUtils_1 = require("./ColorUtils");
class Utils {
    static isSsr() {
        return typeof window === "undefined" || !window;
    }
    static get animate() {
        return this.isSsr()
            ? (callback) => setTimeout(callback)
            : (callback) => (window.requestAnimationFrame ||
                window.webkitRequestAnimationFrame ||
                window.mozRequestAnimationFrame ||
                window.oRequestAnimationFrame ||
                window.msRequestAnimationFrame ||
                window.setTimeout)(callback);
    }
    static get cancelAnimation() {
        return this.isSsr()
            ? (handle) => clearTimeout(handle)
            : (handle) => (window.cancelAnimationFrame ||
                window.webkitCancelRequestAnimationFrame ||
                window.mozCancelRequestAnimationFrame ||
                window.oCancelRequestAnimationFrame ||
                window.msCancelRequestAnimationFrame ||
                window.clearTimeout)(handle);
    }
    static replaceColorSvg(image, color, opacity) {
        if (!image.svgData) {
            return "";
        }
        const svgXml = image.svgData;
        const rgbHex = /#([0-9A-F]{3,6})/gi;
        return svgXml.replace(rgbHex, () => ColorUtils_1.ColorUtils.getStyleFromHsl(color, opacity));
    }
    static clamp(num, min, max) {
        return Math.min(Math.max(num, min), max);
    }
    static isInArray(value, array) {
        return value === array || (array instanceof Array && array.indexOf(value) > -1);
    }
    static mix(comp1, comp2, weight1, weight2) {
        return Math.floor((comp1 * weight1 + comp2 * weight2) / (weight1 + weight2));
    }
    static getParticleBaseVelocity(particle) {
        let velocityBase;
        switch (particle.direction) {
            case Enums_1.MoveDirection.top:
                velocityBase = { x: 0, y: -1 };
                break;
            case Enums_1.MoveDirection.topRight:
                velocityBase = { x: 0.5, y: -0.5 };
                break;
            case Enums_1.MoveDirection.right:
                velocityBase = { x: 1, y: -0 };
                break;
            case Enums_1.MoveDirection.bottomRight:
                velocityBase = { x: 0.5, y: 0.5 };
                break;
            case Enums_1.MoveDirection.bottom:
                velocityBase = { x: 0, y: 1 };
                break;
            case Enums_1.MoveDirection.bottomLeft:
                velocityBase = { x: -0.5, y: 1 };
                break;
            case Enums_1.MoveDirection.left:
                velocityBase = { x: -1, y: 0 };
                break;
            case Enums_1.MoveDirection.topLeft:
                velocityBase = { x: -0.5, y: -0.5 };
                break;
            default:
                velocityBase = { x: 0, y: 0 };
                break;
        }
        return velocityBase;
    }
    static getDistances(pointA, pointB) {
        const dx = pointA.x - pointB.x;
        const dy = pointA.y - pointB.y;
        return { dx: dx, dy: dy, distance: Math.sqrt(dx * dx + dy * dy) };
    }
    static getDistance(pointA, pointB) {
        return this.getDistances(pointA, pointB).distance;
    }
    static loadFont(character) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                yield document.fonts.load(`${character.weight} 36px '${character.font}'`);
            }
            catch (_a) {
            }
        });
    }
    static arrayRandomIndex(array) {
        return Math.floor(Math.random() * array.length);
    }
    static itemFromArray(array, index) {
        return array[index !== undefined ? index : this.arrayRandomIndex(array)];
    }
    static randomInRange(r1, r2) {
        const max = Math.max(r1, r2);
        const min = Math.min(r1, r2);
        return Math.random() * (max - min) + min;
    }
    static isPointInside(point, size, radius) {
        return this.areBoundsInside(this.calculateBounds(point, radius !== null && radius !== void 0 ? radius : 0), size);
    }
    static areBoundsInside(bounds, size) {
        return bounds.left < size.width && bounds.right > 0 && bounds.top < size.height && bounds.bottom > 0;
    }
    static calculateBounds(point, radius) {
        return {
            bottom: point.y + radius,
            left: point.x - radius,
            right: point.x + radius,
            top: point.y - radius,
        };
    }
    static loadImage(source) {
        return new Promise((resolve, reject) => {
            const image = {
                source: source,
                type: source.substr(source.length - 3),
            };
            if (source) {
                const img = new Image();
                img.addEventListener("load", () => {
                    image.element = img;
                    resolve(image);
                });
                img.addEventListener("error", () => {
                    reject(`Error tsParticles - loading image: ${source}`);
                });
                img.src = source;
            }
            else {
                reject("Error tsParticles - No image.src");
            }
        });
    }
    static downloadSvgImage(source) {
        return __awaiter(this, void 0, void 0, function* () {
            if (source) {
                const image = {
                    source: source,
                    type: source.substr(source.length - 3),
                };
                if (image.type !== "svg") {
                    return this.loadImage(source);
                }
                const response = yield fetch(image.source);
                if (response.ok) {
                    image.svgData = yield response.text();
                    return image;
                }
                else {
                    throw new Error("Error tsParticles - Image not found");
                }
            }
            else {
                throw new Error("Error tsParticles - No image.src");
            }
        });
    }
    static deepExtend(destination, ...sources) {
        for (const source of sources) {
            if (source === undefined || source === null) {
                continue;
            }
            if (typeof source !== "object") {
                destination = source;
                continue;
            }
            const sourceIsArray = Array.isArray(source);
            if (sourceIsArray && (typeof destination !== "object" || !destination || !Array.isArray(destination))) {
                destination = [];
            }
            else if (!sourceIsArray &&
                (typeof destination !== "object" || !destination || Array.isArray(destination))) {
                destination = {};
            }
            for (const key in source) {
                if (key === "__proto__") {
                    continue;
                }
                const value = source[key];
                const isObject = typeof value === "object";
                destination[key] =
                    isObject && Array.isArray(value)
                        ? value.map((v) => this.deepExtend(destination[key], v))
                        : this.deepExtend(destination[key], value);
            }
        }
        return destination;
    }
    static isDivModeEnabled(mode, divs) {
        return divs instanceof Array
            ? divs.filter((t) => t.enable && Utils.isInArray(mode, t.mode)).length > 0
            : Utils.isInArray(mode, divs.mode);
    }
    static divModeExecute(mode, divs, callback) {
        if (divs instanceof Array) {
            for (const div of divs) {
                const divMode = div.mode;
                const divEnabled = div.enable;
                if (divEnabled && Utils.isInArray(mode, divMode)) {
                    this.singleDivModeExecute(div, callback);
                }
            }
        }
        else {
            const divMode = divs.mode;
            const divEnabled = divs.enable;
            if (divEnabled && Utils.isInArray(mode, divMode)) {
                this.singleDivModeExecute(divs, callback);
            }
        }
    }
    static singleDivModeExecute(div, callback) {
        const ids = div.ids;
        if (ids instanceof Array) {
            for (const id of ids) {
                callback(id, div);
            }
        }
        else {
            callback(ids, div);
        }
    }
    static divMode(divs, divId) {
        if (!divId) {
            return;
        }
        if (!divs) {
            return;
        }
        if (divs instanceof Array) {
            return divs.find((d) => Utils.isInArray(divId, d.ids));
        }
        else if (Utils.isInArray(divId, divs.ids)) {
            return divs;
        }
    }
}
exports.Utils = Utils;
