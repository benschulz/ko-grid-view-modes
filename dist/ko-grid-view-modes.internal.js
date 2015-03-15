/*
 * Copyright (c) 2015, Ben Schulz
 * License: BSD 3-clause (http://opensource.org/licenses/BSD-3-Clause)
 */
define(['onefold-dom', 'indexed-list', 'onefold-lists', 'onefold-js', 'ko-grid', 'ko-data-source', 'ko-indexed-repeat', 'knockout'],    function(onefold_dom, indexed_list, onefold_lists, onefold_js, ko_grid, ko_data_source, ko_indexed_repeat, knockout) {
var ko_grid_view_modes_view_modes, ko_grid_view_modes;

ko_grid_view_modes_view_modes = function (module, ko, js, koGrid) {
  var extensionId = 'ko-grid-view-modes'.indexOf('/') < 0 ? 'ko-grid-view-modes' : 'ko-grid-view-modes'.substring(0, 'ko-grid-view-modes'.indexOf('/'));
  koGrid.defineExtension(extensionId, {
    Constructor: function ViewModesExtension(bindingValue, config, grid) {
      var toggleModeActivityTo = function (active) {
        return function (modeOrModes, configuration) {
          var modes = typeof modeOrModes === 'string' ? [modeOrModes] : js.arrays.distinct(modeOrModes);
          var activeModesUnderlying = this.activeModes();
          modes.forEach(function (m) {
            if (js.arrays.contains(activeModesUnderlying, m) === active)
              throw new Error('Mode `' + m + '` is already ' + (active ? 'active' : 'inactive') + '.');
          });
          grid.layout.recalculate(function () {
            this.activeModes.valueWillMutate();
            var classList = grid.element.classList;
            if (active) {
              Array.prototype.push.apply(activeModesUnderlying, modes);
              classList.add.apply(classList, modes);
            } else {
              var otherModes = activeModesUnderlying.filter(function (m) {
                return !js.arrays.contains(modes, m);
              });
              activeModesUnderlying.length = 0;
              Array.prototype.push.apply(activeModesUnderlying, otherModes);
              classList.remove.apply(classList, modes);
            }
            activeModesUnderlying.sort();
            if (configuration)
              configuration();
            this.activeModes.valueHasMutated();
          }.bind(this));
        }.bind(this);
      }.bind(this);
      this.activeModes = ko.observableArray([]);
      this.enter = toggleModeActivityTo(true);
      this.leave = toggleModeActivityTo(false);
      this['activeModes'] = this.activeModes;
      this['enver'] = this.enter;
      this['leave'] = this.leave;
    }
  });
  return koGrid.declareExtensionAlias('viewModes', extensionId);
}({}, knockout, onefold_js, ko_grid);
ko_grid_view_modes = function (main) {
  return main;
}(ko_grid_view_modes_view_modes);return ko_grid_view_modes;
});