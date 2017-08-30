import {  
    applyMiddleware,
    combineReducers,
    createStore,
} from 'redux';
import logger from 'redux-logger';
  
// actions.js
export const addDraft = (draft) => ({  
    type: 'ADD_DRAFT',
    draft,
});

export const addPods = (pods) => ({
    type: 'ADD_PODS',
    pods
});

export const addPlayer = (player) => ({
    type: 'ADD_PLAYER',
    player
});

// reducers.js
export const draft = (state = {}, action) => {  
    switch (action.type) {
        case 'ADD_DRAFT':
            return action.draft;
        case 'ADD_PODS':
            return {
                ...state,
                pods: action.pods
            };
        case 'ADD_PLAYER':
            return {
                ...state,
                pods: {...state.pods, players: [...state.pods.players, action.player]}
            }
        default:
            return state;
    }
};

export const reducers = combineReducers({  
    draft
});

// store.js
export function configureStore(initialState = {}) {  
    const store = createStore(
        reducers,
        initialState,
        applyMiddleware(logger)
    )
    return store;
};

export const store = configureStore(); 