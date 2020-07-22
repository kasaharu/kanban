import { createAction, createReducer, on, props, union } from '@ngrx/store';

// NOTE: State
export interface State {
  appShell: any | null;
}

export const initialState: State = {
  appShell: null,
};

// NOTE: Actions
export const saveAppShell = createAction('[AppShell] save', props<{ appShell: any }>());

export const actions = { saveAppShell };
const actionsUnion = union(actions);

// NOTE: Reducer
const appShellReducer = createReducer(initialState, on(saveAppShell, (state, { appShell }) => ({ ...state, appShell })));

export default function reducer(state: State, action: typeof actionsUnion): State {
  return appShellReducer(state, action);
}

// NOTE: Selectors
export const featureName = 'appShell';
