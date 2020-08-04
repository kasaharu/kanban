import { createAction, createReducer, on, props, union } from '@ngrx/store';
import { Section, Task } from '../../../domain/models';
import { createFeatureStoreSelector } from '../../../shared/store/helpers/selector';

// NOTE: State
export interface State {
  sections: Section[];
  tasks: Task[];
}

export const initialState: State = {
  sections: [],
  tasks: [],
};

// NOTE: Actions
const saveSections = createAction('[Board] save sections', props<{ sections: Section[] }>());
const createSection = createAction('[Board] create sections', props<{ section: Section }>());
const saveTasks = createAction('[Board] save tasks', props<{ tasks: Task[] }>());

export const actions = { saveSections, createSection, saveTasks };
const actionsUnion = union(actions);

// NOTE: Reducer
const boardReducer = createReducer(
  initialState,
  on(saveSections, (state, { sections }) => ({ ...state, sections })),
  on(createSection, (state, { section }) => ({ ...state, sections: [...state.sections, section] })),
  on(saveTasks, (state, { tasks }) => ({ ...state, tasks })),
);

export default function reducer(state: State, action: typeof actionsUnion): State {
  return boardReducer(state, action);
}

// NOTE: Selectors
export const featureName = 'board';
export const selectStore = createFeatureStoreSelector<State>(featureName);
