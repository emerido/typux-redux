import {Middleware} from 'redux';
import {getActionMessage, getActionName} from "typux";

export function typuxMiddleware() : Middleware {

    // Plugins

    return store => next => action => {
        if (typeof action !== "object") {
            next(action);
        }
        if (action.type) {
            let message = getActionMessage(action.type);
            if (message != null) {
                action.data = action.data instanceof message
                    ? action.data
                    : Object.assign(new message(), action.data)
            }
        } else if (isInstance(action)) {
            let name = getActionName(action);
            if (name) {
                action = {
                    type : name,
                    data : action
                }
            }
        }
        next(action);
    };
}

function isInstance(value : any) : boolean
{
    return value && value.constructor && value.constructor !== Object;
}