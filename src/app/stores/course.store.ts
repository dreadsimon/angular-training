import { ActionReducer } from '@ngrx/store';

export const GET_ALL = 'getall';
export const GET_ONE = 'getone';
export const ADD = 'add';
export const UPDATE = 'update';
export const DELETE = 'delete';

export const courseStore: ActionReducer<any> = (state: any = {courses: [], course: {}, isDeleted: false, isUpdated: false}, {type, payload}) => {
    switch (type) {
        case GET_ALL:
            return {...state, pages: payload.pages, current: payload.current, courses: payload.courses, isDeleted: false, isUpdated: false};
        case GET_ONE:
            return {...state, course: payload.course, isDeleted: false, isUpdated: false};
        case ADD:
        case UPDATE: {
            return {isUpdated: true, isDeleted: false};
        }
        case DELETE: {
            return {isUpdated: false, isDeleted: true};
        }
        default:
            return state;
    }
};
