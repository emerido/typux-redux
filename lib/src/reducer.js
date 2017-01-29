"use strict";
var typux_1 = require("typux");
function createReducer(initial) {
    return new ReducerBuilder(initial);
}
exports.createReducer = createReducer;
var ReducerBuilder = (function () {
    function ReducerBuilder(initial) {
        this._handlers = {};
        this._initial = initial;
    }
    /**
     * Create handler for specific action
     *
     * @param action
     * @param handler
     * @returns {ReducerBuilder}
     */
    ReducerBuilder.prototype.on = function (action, handler) {
        var actionName;
        if (typeof action == 'string') {
            actionName = action;
        }
        if (typeof action === 'function') {
            actionName = typux_1.getActionName(action);
        }
        if (actionName == null) {
            throw new Error("Can't get action type from " + action);
        }
        if (this._handlers.hasOwnProperty(actionName)) {
            throw new Error("Handler for action type " + actionName + " already registered");
        }
        this._handlers[actionName] = handler;
        return this;
    };
    ReducerBuilder.prototype.initial = function (state) {
        this._initial = state;
        return this;
    };
    ReducerBuilder.prototype.reducer = function () {
        var _this = this;
        return function (state, action) {
            if (_this._handlers.hasOwnProperty(action.type)) {
                var result = _this._handlers[action.type].call(null, state, action.data);
                if (result == void 0) {
                    return state;
                }
                return result;
            }
            else if (state == void 0) {
                return _this._initial;
            }
            return state;
        };
    };
    return ReducerBuilder;
}());
