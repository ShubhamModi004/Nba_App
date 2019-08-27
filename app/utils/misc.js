import AsyncStorage from '@react-native-community/async-storage';

export const FIREBASEURL = `https://my-nba-app-2b3ec.firebaseio.com`;
export const APIKEY = `AIzaSyCIJ2uA0JaZ7C3nBMN5HWoVN5N5Nu0l-Zo`;

export const SIGNUP = `https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=${APIKEY}`;
export const SIGNIN = `https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=${APIKEY}`;
export const REFRESH = `https://securetoken.googleapis.com/v1/token?key=${APIKEY}`;

export const getTokens = (cb) => {
    AsyncStorage.multiGet([
        '@nba-app@token',
        '@nba-app@refreshToken',
        '@nba-app@expireToken',
        '@nba-app@uid',
    ]).then(value => {
        cb(value);
    })
}

export const setTokens = (values, cb) => {
    const dateNow = new Date();
    const expiration = dateNow.getTime() + (3600 * 1000);
    AsyncStorage.multiSet([
        ['@nba-app@token', values.token],
        ['@nba-app@refreshToken', values.refToken],
        ['@nba-app@expireToken', expiration.toString()],
        ['@nba-app@uid', values.uuid],
    ]).then(response => {
        cb();
    })
}

export const convertFirebase = (data) => {
    const newData = [];
    for (let key in data) {
        newData.push({
            ...data[key],
            id: key
        })
    }
    return newData;
}

export const findTeamData = (itemId, teams) => {
    const value = teams.find((team) => {
        return team.id === itemId
    })
    return value;
}