import { createAction, createReducer, on, props, union } from '@ngrx/store';
import { createFeatureStoreSelector } from '../../../shared/store/helpers/selector';

export enum ErrorTypeEnum {
  OverSectionNameLength = 'over_section_name_length',
}

// NOTE: State
export interface State {
  errorType: ErrorTypeEnum | null;
  errorMessage: string;
}

export const initialState: State = {
  errorType: null,
  errorMessage: '',
};

// NOTE: Actions
export const setError = createAction('[Error] set error', props<{ errorType: ErrorTypeEnum }>());

export const actions = { setError: setError };
const actionsUnion = union(actions);

// NOTE: Reducer
const errorReducer = createReducer(
  initialState,
  on(setError, (state, { errorType }) => ({ ...state, errorType })),
);

export default function reducer(state: State, action: typeof actionsUnion): State {
  return errorReducer(state, action);
}

// NOTE: Selectors
export const featureName = 'error';
export const selectStore = createFeatureStoreSelector<State>(featureName);
