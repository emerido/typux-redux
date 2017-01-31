"use strict";
var typux_1 = require("typux");
function typuxMiddleware() {
    // Plugins
    return function (store) { return function (next) { return function (action) {
        if (typeof action !== "object") {
            next(action);
        }
        if (action.type) {
            var message = typux_1.getActionMessage(action.type);
            if (message != null) {
                action.data = action.data instanceof message
                    ? action.data
                    : Object.assign(new message(), action.data);
            }
        }
        else if (isInstance(action)) {
            var name = typux_1.getActionName(action);
            if (name) {
                action = {
                    type: name,
                    data: action
                };
            }
        }
        next(action);
    }; }; };
}
exports.typuxMiddleware = typuxMiddleware;
function isInstance(value) {
    return value && value.constructor && value.constructor !== Object;
}
