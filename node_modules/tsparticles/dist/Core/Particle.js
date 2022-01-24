"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Particle = void 0;
const Updater_1 = require("./Particle/Updater");
const Particles_1 = require("../Options/Classes/Particles/Particles");
const Shape_1 = require("../Options/Classes/Particles/Shape/Shape");
const Enums_1 = require("../Enums");
const Utils_1 = require("../Utils");
class Particle {
    constructor(container, position, overrideOptions) {
        var _a, _b, _c, _d, _e, _f, _g, _h, _j, _k, _l, _m, _o, _p, _q, _r, _s;
        this.container = container;
        this.fill = true;
        this.close = true;
        this.links = [];
        this.lastNoiseTime = 0;
        this.destroyed = false;
        const options = container.options;
        const particlesOptions = new Particles_1.Particles();
        particlesOptions.load(options.particles);
        if ((overrideOptions === null || overrideOptions === void 0 ? void 0 : overrideOptions.shape) !== undefined) {
            const shapeType = (_a = overrideOptions.shape.type) !== null && _a !== void 0 ? _a : particlesOptions.shape.type;
            this.shape = shapeType instanceof Array ? Utils_1.Utils.itemFromArray(shapeType) : shapeType;
            const shapeOptions = new Shape_1.Shape();
            shapeOptions.load(overrideOptions.shape);
            if (this.shape !== undefined) {
                const shapeData = shapeOptions.options[this.shape];
                if (shapeData !== undefined) {
                    this.shapeData = Utils_1.Utils.deepExtend({}, shapeData instanceof Array ? Utils_1.Utils.itemFromArray(shapeData) : shapeData);
                    this.fill = (_c = (_b = this.shapeData) === null || _b === void 0 ? void 0 : _b.fill) !== null && _c !== void 0 ? _c : this.fill;
                    this.close = (_e = (_d = this.shapeData) === null || _d === void 0 ? void 0 : _d.close) !== null && _e !== void 0 ? _e : this.close;
                }
            }
        }
        else {
            const shapeType = particlesOptions.shape.type;
            this.shape = shapeType instanceof Array ? Utils_1.Utils.itemFromArray(shapeType) : shapeType;
            const shapeData = particlesOptions.shape.options[this.shape];
            if (shapeData) {
                this.shapeData = Utils_1.Utils.deepExtend({}, shapeData instanceof Array ? Utils_1.Utils.itemFromArray(shapeData) : shapeData);
                this.fill = (_g = (_f = this.shapeData) === null || _f === void 0 ? void 0 : _f.fill) !== null && _g !== void 0 ? _g : this.fill;
                this.close = (_j = (_h = this.shapeData) === null || _h === void 0 ? void 0 : _h.close) !== null && _j !== void 0 ? _j : this.close;
            }
        }
        if (overrideOptions !== undefined) {
            particlesOptions.load(overrideOptions);
        }
        if (((_k = this.shapeData) === null || _k === void 0 ? void 0 : _k.particles) !== undefined) {
            particlesOptions.load((_l = this.shapeData) === null || _l === void 0 ? void 0 : _l.particles);
        }
        this.particlesOptions = particlesOptions;
        const noiseDelay = this.particlesOptions.move.noise.delay;
        this.noiseDelay =
            (noiseDelay.random.enable
                ? Utils_1.Utils.randomInRange(noiseDelay.random.minimumValue, noiseDelay.value)
                : noiseDelay.value) * 1000;
        container.retina.initParticle(this);
        const color = this.particlesOptions.color;
        const sizeValue = (_m = this.sizeValue) !== null && _m !== void 0 ? _m : container.retina.sizeValue;
        const randomSize = typeof this.particlesOptions.size.random === "boolean"
            ? this.particlesOptions.size.random
            : this.particlesOptions.size.random.enable;
        this.size = {
            value: randomSize && this.randomMinimumSize !== undefined
                ? Utils_1.Utils.randomInRange(this.randomMinimumSize, sizeValue)
                : sizeValue,
        };
        this.direction = this.particlesOptions.move.direction;
        this.bubble = {
            inRange: false,
        };
        this.angle = this.particlesOptions.rotate.random ? Math.random() * 360 : this.particlesOptions.rotate.value;
        if (this.particlesOptions.rotate.direction === Enums_1.RotateDirection.random) {
            const index = Math.floor(Math.random() * 2);
            if (index > 0) {
                this.rotateDirection = Enums_1.RotateDirection.counterClockwise;
            }
            else {
                this.rotateDirection = Enums_1.RotateDirection.clockwise;
            }
        }
        else {
            this.rotateDirection = this.particlesOptions.rotate.direction;
        }
        if (this.particlesOptions.size.animation.enable) {
            switch (this.particlesOptions.size.animation.startValue) {
                case Enums_1.StartValueType.min:
                    if (!randomSize) {
                        const pxRatio = container.retina.pixelRatio;
                        this.size.value = this.particlesOptions.size.animation.minimumValue * pxRatio;
                    }
                    break;
            }
            this.size.status = Enums_1.SizeAnimationStatus.increasing;
            this.size.velocity = ((_o = this.sizeAnimationSpeed) !== null && _o !== void 0 ? _o : container.retina.sizeAnimationSpeed) / 100;
            if (!this.particlesOptions.size.animation.sync) {
                this.size.velocity = this.size.velocity * Math.random();
            }
        }
        if (this.particlesOptions.color.animation.enable) {
            this.colorVelocity = this.particlesOptions.color.animation.speed / 100;
            if (!this.particlesOptions.color.animation.sync) {
                this.colorVelocity = this.colorVelocity * Math.random();
            }
        }
        else {
            this.colorVelocity = 0;
        }
        if (this.particlesOptions.rotate.animation.enable) {
            if (!this.particlesOptions.rotate.animation.sync) {
                this.angle = Math.random() * 360;
            }
        }
        this.position = this.calcPosition(this.container, position);
        this.offset = {
            x: 0,
            y: 0,
        };
        if (this.particlesOptions.collisions.enable) {
            this.checkOverlap(position);
        }
        this.color = Utils_1.ColorUtils.colorToHsl(color);
        const randomOpacity = this.particlesOptions.opacity.random;
        const opacityValue = this.particlesOptions.opacity.value;
        this.opacity = {
            value: randomOpacity.enable ? Utils_1.Utils.randomInRange(randomOpacity.minimumValue, opacityValue) : opacityValue,
        };
        if (this.particlesOptions.opacity.animation.enable) {
            this.opacity.status = Enums_1.OpacityAnimationStatus.increasing;
            this.opacity.velocity = this.particlesOptions.opacity.animation.speed / 100;
            if (!this.particlesOptions.opacity.animation.sync) {
                this.opacity.velocity *= Math.random();
            }
        }
        this.initialVelocity = this.calculateVelocity();
        this.velocity = {
            horizontal: this.initialVelocity.horizontal,
            vertical: this.initialVelocity.vertical,
        };
        let drawer = container.drawers.get(this.shape);
        if (!drawer) {
            drawer = Utils_1.Plugins.getShapeDrawer(this.shape);
            if (drawer) {
                container.drawers.set(this.shape, drawer);
            }
        }
        if (this.shape === Enums_1.ShapeType.image || this.shape === Enums_1.ShapeType.images) {
            const shape = this.particlesOptions.shape;
            const imageDrawer = drawer;
            const imagesOptions = shape.options[this.shape];
            const images = imageDrawer.getImages(container).images;
            const index = Utils_1.Utils.arrayRandomIndex(images);
            const image = images[index];
            const optionsImage = (imagesOptions instanceof Array
                ? imagesOptions.filter((t) => t.src === image.source)[0]
                : imagesOptions);
            const color = this.getColor();
            if ((image === null || image === void 0 ? void 0 : image.svgData) !== undefined && optionsImage.replaceColor && color) {
                const svgColoredData = Utils_1.Utils.replaceColorSvg(image, color, this.opacity.value);
                const svg = new Blob([svgColoredData], { type: "image/svg+xml" });
                const domUrl = window.URL || window.webkitURL || window;
                const url = domUrl.createObjectURL(svg);
                const img = new Image();
                this.image = {
                    data: image,
                    loaded: false,
                    ratio: optionsImage.width / optionsImage.height,
                    replaceColor: (_p = optionsImage.replaceColor) !== null && _p !== void 0 ? _p : optionsImage.replace_color,
                    source: optionsImage.src,
                };
                img.addEventListener("load", () => {
                    if (this.image) {
                        this.image.loaded = true;
                        image.element = img;
                    }
                    domUrl.revokeObjectURL(url);
                });
                img.addEventListener("error", () => {
                    domUrl.revokeObjectURL(url);
                    Utils_1.Utils.loadImage(optionsImage.src).then((img2) => {
                        if (this.image) {
                            image.element = img2.element;
                            this.image.loaded = true;
                        }
                    });
                });
                img.src = url;
            }
            else {
                this.image = {
                    data: image,
                    loaded: true,
                    ratio: optionsImage.width / optionsImage.height,
                    replaceColor: (_q = optionsImage.replaceColor) !== null && _q !== void 0 ? _q : optionsImage.replace_color,
                    source: optionsImage.src,
                };
            }
            if (!this.image.ratio) {
                this.image.ratio = 1;
            }
            this.fill = (_r = optionsImage.fill) !== null && _r !== void 0 ? _r : this.fill;
            this.close = (_s = optionsImage.close) !== null && _s !== void 0 ? _s : this.close;
        }
        this.stroke =
            this.particlesOptions.stroke instanceof Array
                ? Utils_1.Utils.itemFromArray(this.particlesOptions.stroke)
                : this.particlesOptions.stroke;
        this.strokeColor = Utils_1.ColorUtils.colorToRgb(this.stroke.color);
        this.shadowColor = Utils_1.ColorUtils.colorToRgb(this.particlesOptions.shadow.color);
        this.updater = new Updater_1.Updater(this.container, this);
    }
    update(delta) {
        this.links = [];
        this.updater.update(delta);
    }
    draw(delta) {
        var _a;
        if (((_a = this.image) === null || _a === void 0 ? void 0 : _a.loaded) === false) {
            return;
        }
        this.container.canvas.drawParticle(this, delta);
    }
    isOverlapping() {
        const container = this.container;
        let collisionFound = false;
        let iterations = 0;
        const pos1 = this.getPosition();
        for (const p2 of container.particles.array.filter((t) => t != this)) {
            iterations++;
            const pos2 = p2.getPosition();
            const dist = Utils_1.Utils.getDistance(pos1, pos2);
            if (dist <= this.size.value + p2.size.value) {
                collisionFound = true;
                break;
            }
        }
        return {
            collisionFound: collisionFound,
            iterations: iterations,
        };
    }
    checkOverlap(position) {
        const container = this.container;
        const overlapResult = this.isOverlapping();
        if (overlapResult.iterations >= container.particles.count) {
            container.particles.remove(this);
        }
        else if (overlapResult.collisionFound) {
            this.position.x = position ? position.x : Math.random() * container.canvas.size.width;
            this.position.y = position ? position.y : Math.random() * container.canvas.size.height;
            this.checkOverlap();
        }
    }
    startInfection(stage) {
        const container = this.container;
        const options = container.options;
        const stages = options.infection.stages;
        const stagesCount = stages.length;
        if (stage > stagesCount || stage < 0) {
            return;
        }
        this.infectionDelay = 0;
        this.infectionDelayStage = stage;
    }
    updateInfectionStage(stage) {
        const container = this.container;
        const options = container.options;
        const stagesCount = options.infection.stages.length;
        if (stage > stagesCount || stage < 0 || (this.infectionStage !== undefined && this.infectionStage > stage)) {
            return;
        }
        if (this.infectionTimeout !== undefined) {
            window.clearTimeout(this.infectionTimeout);
        }
        this.infectionStage = stage;
        this.infectionTime = 0;
    }
    updateInfection(delta) {
        const container = this.container;
        const options = container.options;
        const infection = options.infection;
        const stages = options.infection.stages;
        const stagesCount = stages.length;
        if (this.infectionDelay !== undefined && this.infectionDelayStage !== undefined) {
            const stage = this.infectionDelayStage;
            if (stage > stagesCount || stage < 0) {
                return;
            }
            if (this.infectionDelay > infection.delay * 1000) {
                this.infectionStage = stage;
                this.infectionTime = 0;
                delete this.infectionDelay;
                delete this.infectionDelayStage;
            }
            else {
                this.infectionDelay += delta;
            }
        }
        else {
            delete this.infectionDelay;
            delete this.infectionDelayStage;
        }
        if (this.infectionStage !== undefined && this.infectionTime !== undefined) {
            const infectionStage = stages[this.infectionStage];
            if (infectionStage.duration !== undefined && infectionStage.duration >= 0) {
                if (this.infectionTime > infectionStage.duration * 1000) {
                    this.nextInfectionStage();
                }
                else {
                    this.infectionTime += delta;
                }
            }
            else {
                this.infectionTime += delta;
            }
        }
        else {
            delete this.infectionStage;
            delete this.infectionTime;
        }
    }
    getPosition() {
        return {
            x: this.position.x + this.offset.x,
            y: this.position.y + this.offset.y,
        };
    }
    getColor() {
        var _a;
        return (_a = this.bubble.color) !== null && _a !== void 0 ? _a : this.color;
    }
    destroy() {
        this.destroyed = true;
    }
    nextInfectionStage() {
        const container = this.container;
        const options = container.options;
        const stagesCount = options.infection.stages.length;
        if (stagesCount <= 0 || this.infectionStage === undefined) {
            return;
        }
        this.infectionTime = 0;
        if (stagesCount <= ++this.infectionStage) {
            if (options.infection.cure) {
                delete this.infectionStage;
                delete this.infectionTime;
                return;
            }
            else {
                this.infectionStage = 0;
                this.infectionTime = 0;
            }
        }
    }
    calcPosition(container, position) {
        var _a, _b;
        for (const [, plugin] of container.plugins) {
            const pluginPos = plugin.particlePosition !== undefined ? plugin.particlePosition(position, this) : undefined;
            if (pluginPos !== undefined) {
                return Utils_1.Utils.deepExtend({}, pluginPos);
            }
        }
        const pos = {
            x: (_a = position === null || position === void 0 ? void 0 : position.x) !== null && _a !== void 0 ? _a : Math.random() * container.canvas.size.width,
            y: (_b = position === null || position === void 0 ? void 0 : position.y) !== null && _b !== void 0 ? _b : Math.random() * container.canvas.size.height,
        };
        const outMode = this.particlesOptions.move.outMode;
        if (Utils_1.Utils.isInArray(outMode, Enums_1.OutMode.bounce) || Utils_1.Utils.isInArray(outMode, Enums_1.OutMode.bounceHorizontal)) {
            if (pos.x > container.canvas.size.width - this.size.value * 2) {
                pos.x -= this.size.value;
            }
            else if (pos.x < this.size.value * 2) {
                pos.x += this.size.value;
            }
        }
        if (Utils_1.Utils.isInArray(outMode, Enums_1.OutMode.bounce) || Utils_1.Utils.isInArray(outMode, Enums_1.OutMode.bounceVertical)) {
            if (pos.y > container.canvas.size.height - this.size.value * 2) {
                pos.y -= this.size.value;
            }
            else if (pos.y < this.size.value * 2) {
                pos.y += this.size.value;
            }
        }
        return pos;
    }
    calculateVelocity() {
        const baseVelocity = Utils_1.Utils.getParticleBaseVelocity(this);
        const res = {
            horizontal: 0,
            vertical: 0,
        };
        const moveOptions = this.particlesOptions.move;
        const rad = (Math.PI / 180) * moveOptions.angle;
        const rad45 = Math.PI / 4;
        const range = {
            left: Math.sin(rad45 + rad / 2) - Math.sin(rad45 - rad / 2),
            right: Math.cos(rad45 + rad / 2) - Math.cos(rad45 - rad / 2),
        };
        if (moveOptions.straight) {
            res.horizontal = baseVelocity.x;
            res.vertical = baseVelocity.y;
            if (moveOptions.random) {
                res.horizontal += Utils_1.Utils.randomInRange(range.left, range.right) / 2;
                res.vertical += Utils_1.Utils.randomInRange(range.left, range.right) / 2;
            }
        }
        else {
            res.horizontal = baseVelocity.x + Utils_1.Utils.randomInRange(range.left, range.right) / 2;
            res.vertical = baseVelocity.y + Utils_1.Utils.randomInRange(range.left, range.right) / 2;
        }
        return res;
    }
}
exports.Particle = Particle;
