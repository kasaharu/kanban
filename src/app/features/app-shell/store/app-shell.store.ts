import { createAction, createReducer, on, props, union } from '@ngrx/store';
import { User } from '../../../domain/models';
import { createFeatureStoreSelector } from '../../../shared/store/helpers/selector';

// NOTE: State
export interface State {
  loggedInUser: User | null;
  readyApp: boolean;
}

export const initialState: State = {
  loggedInUser: null,
  readyApp: false,
};

// NOTE: Actions
const initialize = createAction('[AppShell] initialize', props<{ loggedInUser: User | null }>());
const login = createAction('[AppShell] login', props<{ loggedInUser: User | null }>());
const logout = createAction('[AppShell] logout');

export const actions = { initialize, login, logout };
const actionsUnion = union(actions);

// NOTE: Reducer
const appShellReducer = createReducer(
  initialState,
  on(initialize, (state, { loggedInUser }) => ({ ...state, loggedInUser, readyApp: true })),
  on(login, (state, { loggedInUser }) => ({ ...state, loggedInUser })),
  on(logout, (state) => ({ ...state, loggedInUser: null })),
);

export default function reducer(state: State, action: typeof actionsUnion): State {
  return appShellReducer(state, action);
}

// NOTE: Selectors
export const featureName = 'appShell';
export const selectStore = createFeatureStoreSelector<State>(featureName);
