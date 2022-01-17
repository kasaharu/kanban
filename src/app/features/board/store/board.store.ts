import { createAction, createFeature, createReducer, on, props } from '@ngrx/store';
import { Section } from '../../../domain/section/section.vo';
import { Task } from '../../../domain/task/task';

// NOTE: State
export interface State {
  sections: Section[];
  tasks: Task[];
}

export const initialState: State = {
  sections: [],
  tasks: [],
};

export const featureName = 'board';

// NOTE: Actions
const saveSections = createAction('[Board] save sections', props<{ sections: Section[] }>());
const createSection = createAction('[Board] create sections', props<{ section: Section }>());
const updateSection = createAction('[Board] update section', props<{ section: Section }>());
const deleteSection = createAction('[Board] delete sections', props<{ sectionId: string }>());
const saveTasks = createAction('[Board] save tasks', props<{ tasks: Task[] }>());
const addTask = createAction('[Board] add task', props<{ task: Task }>());
const deleteTask = createAction('[Board] delete task', props<{ taskId: string }>());

export const actions = { saveSections, createSection, updateSection, deleteSection, saveTasks, addTask, deleteTask };

export const boardFeature = createFeature({
  name: featureName,
  reducer: createReducer(
    initialState,
    on(saveSections, (state, { sections }) => ({ ...state, sections })),
    on(createSection, (state, { section }) => ({ ...state, sections: [...state.sections, section] })),
    on(updateSection, (state, { section }) => ({ ...state, sections: state.sections.map((x) => (x.id === section.id ? section : x)) })),
    on(deleteSection, (state, { sectionId }) => ({ ...state, sections: state.sections.filter((section) => section.id !== sectionId) })),
    on(saveTasks, (state, { tasks }) => ({ ...state, tasks })),
    on(addTask, (state, { task }) => ({ ...state, tasks: [...state.tasks, task] })),
    on(deleteTask, (state, { taskId }) => ({ ...state, tasks: state.tasks.filter((task) => task.id !== taskId) })),
  ),
});

export const { reducer, selectSections, selectTasks } = boardFeature;
