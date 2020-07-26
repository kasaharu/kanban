import { createAction, createReducer, on, props, union } from '@ngrx/store';

// NOTE: State
export interface State {
  board: any | null;
}

export const initialState: State = {
  board: null,
};

// NOTE: Actions
export const saveBoard = createAction('[Board] save', props<{ board: any }>());

export const actions = { saveBoard };
const actionsUnion = union(actions);

// NOTE: Reducer
const boardReducer = createReducer(initialState, on(saveBoard, (state, { board }) => ({ ...state, board })));

export default function reducer(state: State, action: typeof actionsUnion): State {
  return boardReducer(state, action);
}

// NOTE: Selectors
export const featureName = 'board';
