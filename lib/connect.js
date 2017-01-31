"use strict";
var react_redux_1 = require("react-redux");
function Connect(props, actions) {
    return function (target) {
        return react_redux_1.connect(props, actions)(target);
    };
}
function createConnect() {
    return Connect;
}
exports.createConnect = createConnect;
