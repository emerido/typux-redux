import { Reducer, Func2 } from 'redux';
import { Constructable, Nullable } from "typux";
export declare function createReducer<S>(initial?: S): ReducerBuilder<S>;
export declare class ReducerBuilder<S> {
    private _after;
    private _initial;
    private _handlers;
    constructor(initial?: S);
    after(handler: (state: S) => void): this;
    /**
     * Create handler for specific action
     *
     * @param action
     * @param handler
     * @returns {ReducerBuilder}
     */
    on<TData>(action: string | Constructable<TData>, handler: Func2<S, TData, Nullable<S>>): this;
    initial(state: S): this;
    reducer(): Reducer<S>;
}
