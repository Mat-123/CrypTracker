import { LOGIN, LOGOUT } from '../actions';

const initialState = {
    user: null,
};

const mainReducer = (state = initialState, action) => {

    switch (action.type) {
        case LOGIN:
            return {
                ...state,
                user: action.payload,
            };

        case LOGOUT:
            return {
                ...state,
                user: null,
            };

        default:
            return state;
    }
};

export default mainReducer;