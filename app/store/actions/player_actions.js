import {
    GET_PLAYERS
} from '../types';

import axios from 'axios';
import { FIREBASEURL } from '../../utils/misc';

export function getPlayer() {
    const request = axios({
        method: 'GET',
        url: `${FIREBASEURL}/player.json`
    }).then(response => {
        const players = response.data;

        return players;
    }).catch(e => {
        return false
    })
    return {
        type: GET_PLAYERS,
        payload: request
    }
}