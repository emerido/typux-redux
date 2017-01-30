import {Dispatch} from "react-redux";

export function attachAction<T extends Function>(dispatch : Dispatch<any>, action : T) : T
{
    function wrapper(...args : any[]) {
        return dispatch(action.apply(null, args));
    }
    return wrapper as any;
}