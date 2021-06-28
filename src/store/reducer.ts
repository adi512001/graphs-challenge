import { initStateType } from '../types';
import { createReducer, PayloadAction } from 'typesafe-actions';
import * as actions from './actions';
import { produce } from 'immer';

const initialState: initStateType = {
    arr: null
}

const appReducer = createReducer(initialState)
    .handleAction(actions.changeArray, (state: initStateType, action: PayloadAction<'CHANGE_ARRAY', {
        arr: Object[];
    }>) => {
        return produce(state, (draft) => {
            draft.arr = action.payload.arr;
        })
    })

export default appReducer;