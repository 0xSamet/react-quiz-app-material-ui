"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Particles = void 0;
const Particle_1 = require("./Particle");
const Utils_1 = require("../Utils");
const InteractionManager_1 = require("./Particle/InteractionManager");
class Particles {
    constructor(container) {
        this.container = container;
        this.array = [];
        this.interactionManager = new InteractionManager_1.InteractionManager(container);
        const canvasSize = this.container.canvas.size;
        this.linksColors = {};
        this.quadTree = new Utils_1.QuadTree(new Utils_1.Rectangle(0, 0, canvasSize.width, canvasSize.height), 4);
    }
    get count() {
        return this.array.length;
    }
    init() {
        const container = this.container;
        const options = container.options;
        let handled = false;
        for (const [, plugin] of container.plugins) {
            if (plugin.particlesInitialization !== undefined) {
                handled = plugin.particlesInitialization();
            }
            if (handled) {
                break;
            }
        }
        if (!handled) {
            for (let i = this.count; i < options.particles.number.value; i++) {
                this.addParticle();
            }
        }
        if (options.infection.enable) {
            for (let i = 0; i < options.infection.infections; i++) {
                const notInfected = this.array.filter((p) => p.infectionStage === undefined);
                const infected = Utils_1.Utils.itemFromArray(notInfected);
                infected.startInfection(0);
            }
        }
        this.interactionManager.init();
        container.noise.init();
    }
    redraw() {
        this.clear();
        this.init();
        this.draw(0);
    }
    removeAt(index, quantity) {
        if (index >= 0 && index <= this.count) {
            for (const particle of this.array.splice(index, quantity !== null && quantity !== void 0 ? quantity : 1)) {
                particle.destroy();
            }
        }
    }
    remove(particle) {
        this.removeAt(this.array.indexOf(particle));
    }
    update(delta) {
        const container = this.container;
        const particlesToDelete = [];
        container.noise.update();
        for (const particle of this.array) {
            particle.bubble.inRange = false;
            for (const [, plugin] of container.plugins) {
                if (particle.destroyed) {
                    break;
                }
                if (plugin.particleUpdate) {
                    plugin.particleUpdate(particle, delta);
                }
            }
            if (!particle.destroyed) {
                particle.update(delta);
            }
            if (particle.destroyed) {
                particlesToDelete.push(particle);
                continue;
            }
            this.quadTree.insert(new Utils_1.Point(particle.getPosition(), particle));
        }
        for (const particle of particlesToDelete) {
            this.remove(particle);
        }
        this.interactionManager.interact(delta);
    }
    draw(delta) {
        const container = this.container;
        container.canvas.clear();
        const canvasSize = this.container.canvas.size;
        this.quadTree = new Utils_1.QuadTree(new Utils_1.Rectangle(0, 0, canvasSize.width, canvasSize.height), 4);
        this.update(delta);
        for (const [, plugin] of container.plugins) {
            container.canvas.drawPlugin(plugin, delta);
        }
        for (const p of this.array) {
            p.draw(delta);
        }
    }
    clear() {
        this.array = [];
    }
    push(nb, mousePosition) {
        var _a;
        const container = this.container;
        const options = container.options;
        const limit = options.particles.number.limit * container.density;
        this.pushing = true;
        if (limit > 0) {
            const countToRemove = this.count + nb - limit;
            if (countToRemove > 0) {
                this.removeQuantity(countToRemove);
            }
        }
        let pos;
        if (mousePosition) {
            pos = (_a = mousePosition.position) !== null && _a !== void 0 ? _a : { x: 0, y: 0 };
        }
        for (let i = 0; i < nb; i++) {
            this.addParticle(pos);
        }
        if (!options.particles.move.enable) {
            this.container.play();
        }
        this.pushing = false;
    }
    addParticle(position, overrideOptions) {
        const particle = new Particle_1.Particle(this.container, position, overrideOptions);
        this.array.push(particle);
        return particle;
    }
    removeQuantity(quantity) {
        const options = this.container.options;
        this.removeAt(0, quantity);
        if (!options.particles.move.enable) {
            this.container.play();
        }
    }
}
exports.Particles = Particles;
