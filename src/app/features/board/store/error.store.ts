import { createAction, createReducer, on, props, union } from '@ngrx/store';

// NOTE: State
export interface State {
  error: any | null;
}

export const initialState: State = {
  error: null,
};

// NOTE: Actions
export const saveError = createAction('[Error] save', props<{ error: any }>());

export const actions = { saveError };
const actionsUnion = union(actions);

// NOTE: Reducer
const errorReducer = createReducer(initialState, on(saveError, (state, { error }) => ({ ...state, error })));

export default function reducer(state: State, action: typeof actionsUnion): State {
  return errorReducer(state, action);
}

// NOTE: Selectors
export const featureName = 'error';
