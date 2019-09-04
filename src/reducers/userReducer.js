import {
    USER_SIGN_IN,
    USER_SIGN_UP,
    GET_REFRESH_TOKEN
} from '../actions/types';
const INITIAL_STATE = {}
export default function (state=INITIAL_STATE, action) {
    switch(action.type) {
        case USER_SIGN_IN:
            return {
                ...state,
                auth: {
                    uid: action.payload.localId || false,
                    token: action.payload.idToken || false,
                    refToken: action.payload.refreshToken || false
                }
            }
        case USER_SIGN_UP:
            return {
                ...state,
                auth: {
                    uid: action.payload.localId || false,
                    token: action.payload.idToken || false,
                    refToken: action.payload.refreshToken || false
                }
            }
        case GET_REFRESH_TOKEN:
            return {
                ...state,
                auth: {
                    uid: action.payload.user_id || false,
                    token: action.payload.id_token || false,
                    refToken: action.payload.refresh_token || false
                } 
            }
        default:
            return state;
    }
}