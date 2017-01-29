import {connect} from "react-redux";

export interface IConnect<TState>
{

    (props : IConnectProps<TState>) : any
    (props : IConnectProps<TState>, actions : IConnectActions<TState>) : any

}

export interface IConnectProps<TState>
{
    (state : TState) : any
}

export interface IConnectActions<TState>
{
    (dispatch : Function) : any
}

function Connect<TState>(props : IConnectProps<TState>, actions : IConnectActions<TState>) : IConnect<TState> {
    return function (target : any) {
        return connect(props, actions)(target);
    };
}


export function createConnect<TState>() : IConnect<TState> {
    return <any>Connect;
}