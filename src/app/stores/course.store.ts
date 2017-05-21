import { ActionReducer } from '@ngrx/store';

export const GET_ALL = 'getall';
export const GET_ONE = 'getone';
export const ADD = 'add';
export const UPDATE = 'update';
export const DELETE = 'delete';

export const courseStore: ActionReducer<any> = (state: any = {courses: [], course: {}, isDeleted: false, isUpdated: false}, {type, payload}) => {
    console.log('store', state, type, payload);
    switch (type) {
        case GET_ALL:
            return {pages: payload.pages, current: payload.current, courses: payload.courses};
        case GET_ONE:
            return {course: payload.course};
        case ADD:
        case UPDATE: {
            return {isUpdated: true};
        }
        case DELETE: {
            return {isDeleted: true};
        }
        default:
            return state;
    }
};
