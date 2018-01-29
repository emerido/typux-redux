import {Middleware} from 'redux';
import {fillAction, getActionClass, getActionName} from "./actions";

export function typuxMiddleware() : Middleware {
    return store => next => (action : any) => {
        if (typeof action !== "object") {
            next(action);
        }



        if (isAction(action)) {
            let message : any = getActionClass(action.type);
            if (message) {
                action.data = action.data instanceof message
                    ? action.data
                    : fillAction(new message(), action.data)
            }
        } else if (isMessage(action)) {
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

function isAction(value : any) : boolean
{
    return value && value.type && typeof value.type === 'string'
        && false == isMessage(value)
        ;
}

function isMessage(value : any) : boolean
{
    return value && value.constructor
        && value.constructor !== Date
        && value.constructor !== Array
        && value.constructor !== Object
        && value.constructor !== Number
        && value.constructor !== String
        && value.constructor !== Function
        ;
}