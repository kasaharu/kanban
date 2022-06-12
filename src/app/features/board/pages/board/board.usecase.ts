import { Injectable } from '@angular/core';
import { ComponentStore } from '@ngrx/component-store';
import { Section } from '../../../../domain/section/section.vo';
import { Task } from '../../../../domain/task/task';

export interface BoardState {
  sections: Section[];
  tasks: Task[];
}

export const initialState: BoardState = {
  sections: [],
  tasks: [],
};

@Injectable()
export class BoardUsecase extends ComponentStore<BoardState> {
  constructor() {
    super(initialState);
  }
}
