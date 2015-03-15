'use strict';

define(['module', 'knockout', 'onefold-js', 'ko-grid'], function (module, ko, js, koGrid) {
    var extensionId = module.id.indexOf('/') < 0 ? module.id : module.id.substring(0, module.id.indexOf('/'));

    koGrid.defineExtension(extensionId, {
        Constructor: function ViewModesExtension(bindingValue, config, grid) {
            var toggleModeActivityTo = active => (modeOrModes, configuration) => {
                var modes = typeof modeOrModes === 'string' ? [modeOrModes] : js.arrays.distinct(modeOrModes);

                var activeModesUnderlying = this.activeModes();

                modes.forEach(m => {
                    if (js.arrays.contains(activeModesUnderlying, m) === active)
                        throw new Error('Mode `' + m + '` is already ' + (active ? 'active' : 'inactive') + '.');
                });

                grid.layout.recalculate(() => {
                    this.activeModes.valueWillMutate();

                    var classList = grid.element.classList;
                    if (active) {
                        Array.prototype.push.apply(activeModesUnderlying, modes);
                        classList.add.apply(classList, modes);
                    } else {
                        var otherModes = activeModesUnderlying.filter(m => !js.arrays.contains(modes, m));
                        activeModesUnderlying.length = 0;
                        Array.prototype.push.apply(activeModesUnderlying, otherModes);
                        classList.remove.apply(classList, modes);
                    }
                    activeModesUnderlying.sort();

                    if (configuration)
                        configuration();

                    this.activeModes.valueHasMutated();
                });
            };

            this.activeModes = ko.observableArray([]);
            this.enter = toggleModeActivityTo(true);
            this.leave = toggleModeActivityTo(false);
            this['activeModes'] = this.activeModes;
            this['enver'] = this.enter;
            this['leave'] = this.leave;
        }
    });

    return koGrid.declareExtensionAlias('viewModes', extensionId);
});
