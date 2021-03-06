# Typux Redux
Typux integration code for Redux

## Examples

### State model
```ts
// Root level of state
export interface IState
{
    users : IMember[];
}

// Specific entity interface
export interface IMember
{

    id : number;

    name : string;

}
```

### Messages
Messages is a typed replacement of Actions
```ts
import {Action} from "typux";

@Action('USER_CREATE')
export class CreateUser
{

    public id : number;
     
    public name : string; 

}

```

### Action creators

Now action creators is a simple factory functions. No more constants and manual payload creating.
TypeScript provides a strong type checking when you call it from containers

```ts
import {CreateUser} from "../messages/users";

export const createUser = (id : number, name : string) => (
    new CreateUser(id, name)
);
```
It's all

### Store
```ts
import {createStore, combineReducers, applyMiddleware} from 'redux';
import {createConnect, typuxMiddleware} from "typux-redux";

// Import simple reducer
import {users} from "../reducers/users";

// Import out state model interface
import {IState} from "./model";

export const store = createStore<IState>(
    combineReducers<IState>({
        users : users
    }), 
    applyMiddleware(
        typuxMiddleware()
    )
);

// Create well typed connect decorator
export const Connect = createConnect<IState>();
```

### Reducers

```ts
import {createReducer} from "typux-redux";

// Import type for reducer
import {IMember} from "../store/model";

// Import ours messages
import {CreateUser} from "../messages/users";

export const reducer = createReducer<IMember[]>()
    // Define handlers for our messages
    .on(CreateUser, (state, model) => (
        [...state, {id : model.id, name : model.name}]
    ))
    .initial([]) // Or Immutable :)
    .reducer() // Return reducer function
;
```

### Containers
```ts
import * as React from 'react'

// Import strong typed connect decorator
import {Connect} from "../store/index";

// Import action creators
import {fetchUsers, createUser, deleteUser} from "../actions/users";

// Helper function
import {attachAction} from "typux-redux";

@Connect(
    (state) => ({
        users: state.users
    }),
    (dispatch) => ({
        refresh : attachAction(dispatch, fetchUsers),
        remove : attachAction(dispatch, deleteUser),
        create : attachAction(dispatch, createUser)
    })
)
export class App extends Component<any, any>
{
    
}
```
