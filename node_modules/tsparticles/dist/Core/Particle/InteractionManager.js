"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.InteractionManager = void 0;
const Grabber_1 = require("./Interactions/Mouse/Grabber");
const Repulser_1 = require("./Interactions/Mouse/Repulser");
const Bubbler_1 = require("./Interactions/Mouse/Bubbler");
const Connector_1 = require("./Interactions/Mouse/Connector");
const Linker_1 = require("./Interactions/Particles/Linker");
const Attractor_1 = require("./Interactions/Particles/Attractor");
const Collider_1 = require("./Interactions/Particles/Collider");
const Infecter_1 = require("./Interactions/Particles/Infecter");
class InteractionManager {
    constructor(container) {
        this.container = container;
        this.externalInteractors = [
            new Bubbler_1.Bubbler(container),
            new Connector_1.Connector(container),
            new Grabber_1.Grabber(container),
            new Repulser_1.Repulser(container),
        ];
        this.particleInteractors = [
            new Attractor_1.Attractor(container),
            new Collider_1.Collider(container),
            new Infecter_1.Infecter(container),
            new Linker_1.Linker(container),
        ];
    }
    init() {
    }
    interact(delta) {
        this.externalInteract(delta);
        this.particlesInteract(delta);
    }
    externalInteract(delta) {
        for (const interactor of this.externalInteractors) {
            if (interactor.isEnabled()) {
                interactor.interact(delta);
            }
        }
    }
    particlesInteract(delta) {
        for (const particle of this.container.particles.array) {
            for (const interactor of this.externalInteractors) {
                interactor.reset(particle);
            }
            for (const interactor of this.particleInteractors) {
                if (interactor.isEnabled(particle)) {
                    interactor.interact(particle, delta);
                }
            }
        }
    }
}
exports.InteractionManager = InteractionManager;
