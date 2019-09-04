import axios from 'axios';
import {
    USER_SIGN_IN,
    USER_SIGN_UP,
    GET_REFRESH_TOKEN
} from './types';
import { 
    SIGN_IN,
    SIGN_UP,
    FIREBASE_URL,
    REFRESH
} from '../utils/misc';

export const signUp = ({ email, password }) => {
    const request = axios({
        method: 'POST',
        url: SIGN_UP,
        data: {
            email,
            password,
            returnSecureToken: true
        },
        headers: {
            "Content-Type": "application/json"
        }
    })
    .then(res => res.data)
    .catch(e => false)

    return {
        type: USER_SIGN_UP,
        payload: request
    }
}

export const signIn = ({ email, password }) => {
    const request = axios({
        method: 'POST',
        url: SIGN_IN,
        data: {
            email,
            password,
            returnSecureToken: true
        },
        headers: {
            "Content-Type": "application/json"
        }
    })
    .then(res => res.data)
    .catch(e => false)

    return {
        type: USER_SIGN_IN,
        payload: request
    }
};

export const autoSignIn = refToken => {
    const request = axios({
        method: 'POST',
        url: REFRESH,
        data: "grant_type=refresh_token&refresh_token="+ refToken,
        headers: {
            "Content-Type": "application/x-www-form-urlencoded"
        }
    })
    .then(res => res.data)
    .catch(e => false)

    return {
        type: GET_REFRESH_TOKEN,
        payload: request
    }
}
