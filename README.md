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