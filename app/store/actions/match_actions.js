import {
    GET_MATCH
} from '../types';

import axios from 'axios';
import { FIREBASEURL } from '../../utils/misc';

export function getMatch() {
    const request = axios({
        method: 'GET',
        url: `${FIREBASEURL}/today.json`
    }).then(response => {
        const match = response.data;

        return match;
    }).catch(e => {
        return false
    })
    return {
        type: GET_MATCH,
        payload: request
    }
}