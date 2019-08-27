import {
    GET_MATCH
} from '../types';

export default function (state = {}, action) {
    switch (action.type) {
        case GET_MATCH:
            return { ...state, match: action.payload }
        default:
            return state;
    }
}