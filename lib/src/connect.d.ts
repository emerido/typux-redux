export interface IConnect<TState> {
    (props: IConnectProps<TState>): any;
    (props: IConnectProps<TState>, actions: IConnectActions<TState>): any;
}
export interface IConnectProps<TState> {
    (state: TState): any;
}
export interface IConnectActions<TState> {
    (dispatch: Function): any;
}
export declare function createConnect<TState>(): IConnect<TState>;
