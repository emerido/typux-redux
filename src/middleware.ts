import {Middleware} from 'redux';
import {fillAction, getActionClass, getActionName} from "./actions";

export function typuxMiddleware() : Middleware {
    return store => next => (action : any) => {
        if (typeof action !== "object") {
            next(action);
        }
        if (action.type && typeof action.type == 'string') {
            let message : any = getActionClass(action.type);
            if (message) {
                action.data = action.data instanceof message
                    ? action.data
                    : fillAction(new message(), action.data)
            }
        } else if (isInstance(action)) {
            let name = getActionName(action);
            if (name) {
                action = {
                    type : name as string,
                    data : action
                }
            }
        }
        return next(action);
    };
}

function isInstance(value : any) : boolean
{
    return value && value.constructor && value.constructor !== Object;
}