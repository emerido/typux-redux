import { Dispatch } from "react-redux";
export interface IConnect<TState> {
    (props: IConnectProps<TState>): any;
    (props: IConnectProps<TState>, actions: IConnectActions<TState>): any;
}
export interface IConnectProps<TState> {
    (state: TState): any;
}
export interface IConnectActions<TState> {
    (dispatch: Dispatch<TState>): any;
}
export declare function createConnect<TState>(): IConnect<TState>;
