/** @namespace */
var koGridViewModes = {};

/**
 * @constructor
 */
koGridViewModes.KoGridViewModes = function () {};

/**
 * @type {ko.Subscribable<Array<string>>}
 */
koGridViewModes.KoGridViewModes.prototype.activeModes;

/**
 * @param {!(string|Array<string>)} modeOrModes
 * @param {function()=} configuration
 */
koGridViewModes.KoGridViewModes.prototype.enter = function (modeOrModes, configuration) {};

/**
 * @param {!(string|Array<string>)} modeOrModes
 * @param {function()=} configuration
 */
koGridViewModes.KoGridViewModes.prototype.leave = function (modeOrModes, configuration) {};
