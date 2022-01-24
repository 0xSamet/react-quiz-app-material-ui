"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Plugins = void 0;
class Plugins {
    static getPlugin(plugin) {
        return this.plugins.filter((t) => t.id === plugin)[0];
    }
    static addPlugin(plugin) {
        if (!this.getPlugin(plugin.id)) {
            this.plugins.push(plugin);
        }
    }
    static getAvailablePlugins(container) {
        const res = new Map();
        const availablePlugins = this.plugins.filter((t) => t.needsPlugin(container.options));
        for (const plugin of availablePlugins) {
            res.set(plugin.id, plugin.getPlugin(container));
        }
        return res;
    }
    static loadOptions(options, sourceOptions) {
        for (const plugin of this.plugins) {
            plugin.loadOptions(options, sourceOptions);
        }
    }
    static getPreset(preset) {
        return this.presets.get(preset);
    }
    static addPreset(presetKey, options) {
        if (!this.getPreset(presetKey)) {
            this.presets.set(presetKey, options);
        }
    }
    static addShapeDrawer(type, drawer) {
        if (!this.getShapeDrawer(type)) {
            this.drawers.set(type, drawer);
        }
    }
    static getShapeDrawer(type) {
        return this.drawers.get(type);
    }
    static getSupportedShapes() {
        return this.drawers.keys();
    }
}
exports.Plugins = Plugins;
Plugins.plugins = [];
Plugins.presets = new Map();
Plugins.drawers = new Map();
