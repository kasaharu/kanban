import { createAction, createFeature, createReducer, on, props } from '@ngrx/store';
import { ErrorTypeEnum, mappingErrorMessage } from '../presenters/helpers/error-message';

// NOTE: State
export interface State {
  errorType: ErrorTypeEnum | null;
  errorMessage: string;
}

export const initialState: State = {
  errorType: null,
  errorMessage: '',
};

export const featureName = 'error';

// NOTE: Actions
export const setError = createAction('[Error] set error', props<{ errorType: ErrorTypeEnum }>());
export const clearError = createAction('[Error] clear error');

export const actions = { setError, clearError };

export const errorFeature = createFeature({
  name: featureName,
  reducer: createReducer(
    initialState,
    on(setError, (state, { errorType }) => ({ ...state, errorType, errorMessage: mappingErrorMessage[errorType] })),
    on(clearError, (state) => ({ ...state, errorType: null, errorMessage: '' })),
  ),
});

export const { reducer, selectErrorType, selectErrorMessage } = errorFeature;

// NOTE: Reducer
// const errorReducer = createReducer(
//   initialState,
//   on(setError, (state, { errorType }) => ({ ...state, errorType, errorMessage: mappingErrorMessage[errorType] })),
//   on(clearError, (state) => ({ ...state, errorType: null, errorMessage: '' })),
// );
//
// export default function reducer(state: State, action: typeof actionsUnion): State {
//   return errorReducer(state, action);
// }
//
// // NOTE: Selectors
// export const selectStore = createFeatureStoreSelector<State>(featureName);
