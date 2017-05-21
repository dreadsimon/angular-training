import { ActionReducer } from '@ngrx/store';

export const LOGIN = 'login';
export const LOGOUT = 'logout';
export const USER_INFO = 'userinfo';
export const AUTHENTICATED = 'authenticated';

export const authStore: ActionReducer<any> = (state: any = {user: {}, isAuthenticated: false, token: null}, {type, payload}) => {
    switch (type) {
        case LOGIN:
            return {token: payload.token};
        case USER_INFO:
            return {user: payload.user};
        case AUTHENTICATED:
            return {isAuthenticated: payload.isAuthenticated};
        case LOGOUT: {
            return {user: {}, isAuthenticated: false, token: null};
        }
        default:
            return state;
    }
};
