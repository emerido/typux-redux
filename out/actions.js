"use strict";
var typux_1 = require("typux");
function attachAction(dispatch, action) {
    function wrapper() {
        var args = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            args[_i] = arguments[_i];
        }
        return dispatch(action.apply(null, args));
    }
    return wrapper;
}
exports.attachAction = attachAction;
exports.ACTION = Symbol('redux.action');
exports.Action = function (name) { return typux_1.Attribute(exports.ACTION, name); };
function getActionName(type) {
    return typux_1.reflect.getClassInfo(type).getAttribute(exports.ACTION);
}
exports.getActionName = getActionName;
function getActionMessage(name) {
    return (typux_1.reflect.classes
        .find(function (x) { return x.hasAttribute(exports.ACTION) && x.getAttribute(exports.ACTION) === name; })
        || {})
        .type;
}
exports.getActionMessage = getActionMessage;
