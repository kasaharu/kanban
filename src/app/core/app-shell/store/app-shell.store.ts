import { createAction, createFeature, createReducer, on, props } from '@ngrx/store';
import { User } from '../../../domain/user/user';

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

export const featureName = 'appShell';
export const appShellFeature = createFeature({
  name: featureName,
  reducer: createReducer(
    initialState,
    on(initialize, (state, { loggedInUser }) => ({ ...state, loggedInUser, readyApp: true })),
    on(login, (state, { loggedInUser }) => ({ ...state, loggedInUser })),
    on(logout, (state) => ({ ...state, loggedInUser: null })),
  ),
});

export const { reducer, selectLoggedInUser, selectReadyApp } = appShellFeature;
