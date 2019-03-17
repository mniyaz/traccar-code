import {combineReducers} from 'redux';

const initialState = {
    devices: [],
    positions: [],
    events: []
};

function positionReducer(state = initialState, action) {
    switch (action.type) {
        case 'UPDATE_DEVICES':
            return Object.assign({}, {
                ...state,
                devices: [...action.devices]
            });
        case 'UPDATE_POSITIONS': {
            console.log(action)
            return Object.assign({}, {
                ...state,
                positions: [...action.positions]
            });
        }
        default:
            return state;
    }
}

const rootReducer = combineReducers({positionReducer});

export default rootReducer;
