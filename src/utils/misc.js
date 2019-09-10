import { AsyncStorage } from 'react-native';

export const FIREBASE_URL = `https://nba-app-16ccc.firebaseio.com`;
export const API_KEY = `AIzaSyA6sN1VraO1d2vjb45F-LIkw_PjPCaTo0E`;
export const SIGN_IN = `https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=${API_KEY}`;
export const SIGN_UP = `https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=${API_KEY}`;
export const REFRESH = `https://securetoken.googleapis.com/v1/token?key=${API_KEY}`;

export const setTokens = (values, cb) => {
    const dateNow = new Date();
    const expiration = dateNow.getTime() + (3600 * 1000);

    AsyncStorage.multiSet([
        ['@nba_app@token', values.token],
        ['@nba_app@refreshToken', values.refToken],
        ['@nba_app@uid', values.uid],
        ['@nba_app@expireToken', expiration.toString()]
    ]).then(response => {
        cb()
    });
}

export const getTokens = (cb) => {
    AsyncStorage.multiGet([
        '@nba_app@token',
        '@nba_app@refreshToken',
        '@nba_app@uid',
        '@nba_app@expireToken'
    ]).then(response => {
        cb(response);
    });
}

export const formatFirebaseData = data => {
    const newData = [];
        for(key in data) {
            newData.push({
                ...data[key],
                id: key
            })
        }
        return newData;
}

export const findTeamData = (itemId, teams) => {
    return teams.find(team => team.id === itemId);
}
