import {Reducer, Action, Func2} from 'redux';
import {Constructable, Dictionary, Nullable} from "./helpers";
import {getActionName} from "typux";

export function createReducer<S>(initial? : S) : ReducerBuilder<S>
{
    return new ReducerBuilder(initial);
}

export class ReducerBuilder<S>
{

    private _initial : S;

    private _handlers : Dictionary<Func2<S, any, Nullable<S>>> = {};

    constructor(initial?: S) {
        this._initial = initial;
    }

    /**
     * Create handler for specific action
     *
     * @param action
     * @param handler
     * @returns {ReducerBuilder}
     */
    on<TData>(action : string | Constructable<TData>, handler : Func2<S, TData, Nullable<S>>) : this
    {
        let actionName;
        if (typeof action == 'string') {
            actionName = action;
        }
        if (typeof action === 'function') {
            actionName = getActionName(action);
        }
        if (actionName == null) {
            throw new Error(`Can't get action type from ${action}`);
        }
        if (this._handlers.hasOwnProperty(actionName)) {
            throw new Error(`Handler for action type ${actionName} already registered`);
        }
        this._handlers[actionName] = handler;
        return this;
    }

    initial(state : S) : this
    {
        this._initial = state;
        return this;
    }

    reducer() : Reducer<S>
    {
        return (state : S, action : any) => {
            if (this._handlers.hasOwnProperty(action.type)) {
                let result = this._handlers[action.type].call(null, state, action.data);

                if (result == void 0) {
                    return state;
                }

                return result;
            } else if (state == void 0) {
                return this._initial;
            }
            return state;
        }
    }

}