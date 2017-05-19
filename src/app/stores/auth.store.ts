import { ActionReducer } from '@ngrx/store';

export const LOGIN = 'login';
export const LOGOUT = 'logout';
export const USER_INFO = 'userinfo';

export const authStore: ActionReducer<any> = (state: any = null, {type, payload}) => {
    console.log('store', payload, type);
    switch (type) {
        case LOGIN:
            return payload;
        case USER_INFO:
            return payload;
        case LOGOUT: {
            return payload;
        }
        default:
            return state;
    }
};
