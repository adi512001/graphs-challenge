import { createAction } from 'typesafe-actions';

export const changeArray = createAction('CHANGE_ARRAY', (arr: Object[]) => ({
    arr
}))();