import { createAction, createReducer, on, props, union } from '@ngrx/store';
import { Section } from '../../../domain/models';
import { createFeatureStoreSelector } from '../../../shared/store/helpers/selector';

// NOTE: State
export interface State {
  sections: Section[];
}

export const initialState: State = {
  sections: [],
};

// NOTE: Actions
export const saveSections = createAction('[Board] save sections', props<{ sections: Section[] }>());

export const actions = { saveSections };
const actionsUnion = union(actions);

// NOTE: Reducer
const boardReducer = createReducer(
  initialState,
  on(saveSections, (state, { sections }) => ({ ...state, sections })),
);

export default function reducer(state: State, action: typeof actionsUnion): State {
  return boardReducer(state, action);
}

// NOTE: Selectors
export const featureName = 'board';
export const selectStore = createFeatureStoreSelector<State>(featureName);
