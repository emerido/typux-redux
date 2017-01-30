"use strict";
function attachAction(dispatch, action) {
    var wrapper = function () {
        var args = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            args[_i - 0] = arguments[_i];
        }
        return dispatch(action.apply(null, args));
    };
    return wrapper;
}
exports.attachAction = attachAction;
function test(a) {
    return a + 2;
}
var attached = attachAction(function (action) { return action; }, test);
attached(1);
