import { CdkDragDrop, moveItemInArray, transferArrayItem } from '@angular/cdk/drag-drop';
import { NgIf } from '@angular/common';
import { ChangeDetectionStrategy, Component, OnInit, computed, inject } from '@angular/core';
import { SectionHasTasks } from '../../../../domain/models';
import { Task } from '../../../../domain/task/task';
import { BoardViewComponent } from '../../presenters/board-view/board-view.component';
import { SectionFormComponent } from '../../presenters/section-form/section-form.component';
import { BoardStore } from './board.store';
import { BoardUsecase } from './board.usecase';

@Component({
  selector: 'app-board',
  templateUrl: './board.component.html',
  styleUrls: ['./board.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [BoardUsecase, BoardStore],
  standalone: true,
  imports: [NgIf, SectionFormComponent, BoardViewComponent],
})
export class BoardComponent implements OnInit {
  #store = inject(BoardStore);
  #usecase = inject(BoardUsecase);

  $sectionsHasTasks = computed(() => this.#store.sectionsHasTasks());
  // NOTE: task が section をまたいで移動するために必要
  $sectionIds = computed(() => this.$sectionsHasTasks().map((x) => x.id));

  ngOnInit(): void {
    this.#usecase.fetchBoardItem();
  }

  dropSection(event: CdkDragDrop<SectionHasTasks[]>) {
    moveItemInArray(event.container.data, event.previousIndex, event.currentIndex);
    this.#usecase.moveSection(event.container.data);
  }

  addSection(sectionName: string) {
    this.#usecase.addSection(sectionName);
  }

  deleteSection(section: SectionHasTasks) {
    if (window.confirm('セクションを削除しますか？(紐づくタスクも削除されます)')) {
      this.#usecase.deleteSection(section);
    }
  }

  changeSectionName(event: { newName: string; section: SectionHasTasks }) {
    this.#usecase.updateSectionName(event.newName, event.section);
  }

  dropTask(event: CdkDragDrop<Task[]>) {
    if (event.previousContainer === event.container) {
      moveItemInArray(event.container.data, event.previousIndex, event.currentIndex);
      this.#usecase.moveTask(event.container.data);
    } else {
      const destinationSectionId = event.container.element.nativeElement.dataset.sectionId;

      // TODO: エラー処理を見直す
      if (!destinationSectionId) {
        console.error('移動先の sectionId が見つからない');
        return;
      }

      transferArrayItem(event.previousContainer.data, event.container.data, event.previousIndex, event.currentIndex);
      this.#usecase.transferTask(event.previousContainer.data, event.container.data, destinationSectionId);
    }
  }

  addTask(event: { task: Task; section: SectionHasTasks }) {
    this.#usecase.createTask(event.task, event.section);
  }

  deleteTask(taskId: string) {
    if (window.confirm('タスクを削除しますか？')) {
      this.#usecase.deleteTask(taskId);
    }
  }
}
