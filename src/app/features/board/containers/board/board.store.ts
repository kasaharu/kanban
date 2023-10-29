import { Injectable, computed, signal } from '@angular/core';
import { SectionHasTasks } from '../../../../domain/models';
import { Section } from '../../../../domain/section/section.vo';
import { Task } from '../../../../domain/task/task';

@Injectable()
export class BoardStore {
  private readonly _$sections = signal<Section[]>([]);
  private readonly _$tasks = signal<Task[]>([]);

  private readonly _$sortedSections = computed(() => {
    return [...this._$sections()].sort((a, b) => a.orderId - b.orderId);
  });

  private readonly _$sortedTasks = computed(() => {
    return [...this._$tasks()].sort((a, b) => a.orderId - b.orderId);
  });

  $sectionsHasTasks = computed(() => {
    return this._$sortedSections().map(({ id, name, userId, orderId }) => {
      const tasks = this._$sortedTasks().filter((task) => task.sectionId === id);
      const result: SectionHasTasks = { id, name, userId, orderId, tasks };
      return result;
    });
  });

  setSections(sections: Section[]) {
    this._$sections.set(sections);
  }

  addSection(section: Section) {
    this._$sections.set([...this._$sections(), section]);
  }

  updateSection(targetSection: Section) {
    this._$sections.set(
      this._$sections().map((section) => {
        return section.id === targetSection.id ? targetSection : section;
      }),
    );
  }

  deleteSection(sectionId: string) {
    this._$sections.set(this._$sections().filter((section) => section.id !== sectionId));
  }

  setTasks(tasks: Task[]) {
    this._$tasks.set(tasks);
  }

  createTask(task: Task) {
    this._$tasks.set([...this._$tasks(), task]);
  }

  deleteTask(taskId: string) {
    this._$tasks.set(this._$tasks().filter((task) => task.id !== taskId));
  }
}
