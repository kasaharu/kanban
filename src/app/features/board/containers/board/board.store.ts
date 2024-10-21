import { computed } from '@angular/core';
import { patchState, signalStore, withComputed, withMethods, withState } from '@ngrx/signals';
import { SectionHasTasks } from '../../../../domain/models';
import { Section } from '../../../../domain/section/section.vo';
import { Task } from '../../../../domain/task/task';

type BoardState = {
  _sections: Section[];
  _tasks: Task[];
  _showTaskDetail: boolean;
};

const initialState: BoardState = {
  _sections: [],
  _tasks: [],
  _showTaskDetail: false,
};

const sortByOrderIdAsc = (a: { orderId: number }, b: { orderId: number }) => a.orderId - b.orderId;

export const BoardStore = signalStore(
  withState(initialState),
  withComputed((state) => ({
    sectionsHasTasks: computed(() => {
      return [...state._sections()].sort(sortByOrderIdAsc).map(({ id, name, ownerId, orderId }) => {
        const tasks = [...state._tasks()].sort(sortByOrderIdAsc).filter((task) => task.sectionId === id);
        const result: SectionHasTasks = { id, name, ownerId, orderId, tasks };
        return result;
      });
    }),
    showTaskDetail: computed(() => state._showTaskDetail()),
  })),
  withMethods((store) => ({
    setSections(sections: Section[]): void {
      patchState(store, { _sections: sections });
    },
    addSection(section: Section): void {
      patchState(store, { _sections: [...store._sections(), section] });
    },
    updateSection(targetSection: Section): void {
      const sections = store._sections().map((section) => {
        return section.id === targetSection.id ? targetSection : section;
      });
      patchState(store, { _sections: sections });
    },
    deleteSection(sectionId: string): void {
      patchState(store, { _sections: store._sections().filter((section) => section.id !== sectionId) });
    },
    setTasks(tasks: Task[]): void {
      patchState(store, { _tasks: tasks });
    },
    createTask(task: Task): void {
      patchState(store, { _tasks: [...store._tasks(), task] });
    },
    deleteTask(taskId: string): void {
      patchState(store, { _tasks: store._tasks().filter((task) => task.id !== taskId) });
    },
  })),
);
