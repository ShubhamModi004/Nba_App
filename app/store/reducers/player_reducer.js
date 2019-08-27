import {
    GET_PLAYERS
} from '../types';

export default function (state = {}, action) {
    switch (action.type) {
        case GET_PLAYERS:
            return { ...state, players: action.payload }
        default:
            return state;
    }
}