"use strict";
var actions_1 = require("./actions");
function typuxMiddleware() {
    return function (store) { return function (next) { return function (action) {
        if (typeof action !== "object") {
            next(action);
        }
        if (isAction(action)) {
            var message = actions_1.getActionClass(action.type);
            if (message) {
                action.data = action.data instanceof message
                    ? action.data
                    : actions_1.fillAction(new message(), action.data);
            }
        }
        else if (isMessage(action)) {
            var name = actions_1.getActionName(action);
            if (name) {
                action = {
                    type: name,
                    data: action
                };
            }
        }
        return next(action);
    }; }; };
}
exports.typuxMiddleware = typuxMiddleware;
function isAction(value) {
    return value && value.type && typeof value.type === 'string'
        && false == isMessage(value);
}
function isMessage(value) {
    return value && value.constructor
        && value.constructor !== Date
        && value.constructor !== Array
        && value.constructor !== Object
        && value.constructor !== Number
        && value.constructor !== String
        && value.constructor !== Function;
}
