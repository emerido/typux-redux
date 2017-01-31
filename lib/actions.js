"use strict";
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
