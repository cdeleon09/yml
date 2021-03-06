import {  
    applyMiddleware,
    combineReducers,
    createStore,
} from 'redux';
import logger from 'redux-logger';
  
// actions.js
export const addDraft = (draft, pods) => ({  
    type: 'ADD_DRAFT',
    draft,
    pods
});

export const addPlayers = (pod, players) => ({
    type: 'ADD_PLAYER',
    pod,
    players
});

// reducers.js
export const draft = (state = {}, action) => {  
    switch (action.type) {
        case 'ADD_DRAFT':
            return {
                name: action.draft,
                pods: action.pods
            };
        case 'ADD_PLAYER':
            let updatedPods = [...state.pods];
            let podId = action.pod.id;
            
            updatedPods[podId].players = action.players;

            return {
                ...state,
                pods: updatedPods
            };
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