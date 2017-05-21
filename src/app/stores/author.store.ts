import { ActionReducer } from '@ngrx/store';

export const GET_ALL = 'getallauthors';

export const authorStore: ActionReducer<any> = (state: any = {authors: []}, {type, payload}) => {
    switch (type) {
        case GET_ALL:
            return {authors: payload.authors};
        default:
            return state;
    }
};
