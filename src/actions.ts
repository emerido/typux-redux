import {reflect, Attribute} from "typux";
import {Dispatch} from "react-redux";

export function attachAction<T extends Function>(dispatch : Dispatch<any>, action : T) : T
{
    function wrapper(...args : any[]) {
        return dispatch(action.apply(null, args));
    }
    return wrapper as any;
}

export const ACTION = Symbol('redux.action');

export const Action = (name : string) => Attribute(ACTION, name) as ClassDecorator;

export function getActionName(type : any)
{
    return reflect.getClassInfo(type).getAttribute(ACTION);
}

export function getActionClass(name : string)
{
    return (
        reflect.classes
            .find(x => x.hasAttribute(ACTION) && x.getAttribute(ACTION) === name)
        || {} as any
    )
        .type;
}

export function fillAction(target : any, data : any)
{
    Object.keys(data).forEach(key => {
        if (target.hasOwnProperty(key) && typeof target[key] == 'function')
            return;

        target[key] = data[key];
    })
}