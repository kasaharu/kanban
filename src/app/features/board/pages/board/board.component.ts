import { CdkDragDrop, moveItemInArray, transferArrayItem } from '@angular/cdk/drag-drop';
import { ChangeDetectionStrategy, Component, OnDestroy, OnInit } from '@angular/core';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { SectionHasTasks } from '../../../../domain/models';
import { Task } from '../../../../domain/task/task';
import { BoardUsecase } from './board.usecase';

@Component({
  // template: `<app-sections></app-sections>`,
  templateUrl: './board.component.html',
  styleUrls: ['./board.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [BoardUsecase],
})
export class BoardPageComponent implements OnInit, OnDestroy {
  constructor(private usecase: BoardUsecase) {}

  private _onDestroy$ = new Subject<void>();
  private _sectionIds!: string[];

  sectionsHasTasks$ = this.usecase.sectionsHasTasks$;

  ngOnInit(): void {
    this.sectionsHasTasks$.pipe(takeUntil(this._onDestroy$)).subscribe((sectionsHasTasks) => {
      this._sectionIds = sectionsHasTasks.map((x) => x.id);
    });
    this.usecase.fetchBoardItem();
  }

  ngOnDestroy(): void {
    this._onDestroy$.next();
  }

  // NOTE: task が section をまたいで移動するために必要
  getConnectedList() {
    return this._sectionIds;
  }

  dropSection(event: CdkDragDrop<SectionHasTasks[]>) {
    moveItemInArray(event.container.data, event.previousIndex, event.currentIndex);
    this.usecase.moveSection(event.container.data);
  }

  deleteSection(section: SectionHasTasks) {
    if (window.confirm('セクションを削除しますか？(紐づくタスクも削除されます)')) {
      this.usecase.deleteSection(section);
    }
  }

  dropTask(event: CdkDragDrop<Task[]>) {
    if (event.previousContainer === event.container) {
      moveItemInArray(event.container.data, event.previousIndex, event.currentIndex);
      this.usecase.moveTask(event.container.data);
    } else {
      const destinationSectionId = event.container.element.nativeElement.dataset.sectionId;

      // TODO: エラー処理を見直す
      if (!destinationSectionId) {
        console.error('移動先の sectionId が見つからない');
        return;
      }

      transferArrayItem(event.previousContainer.data, event.container.data, event.previousIndex, event.currentIndex);
      this.usecase.transferTask(event.previousContainer.data, event.container.data, destinationSectionId);
    }
  }

  addTask(task: Task, section: SectionHasTasks) {
    this.usecase.createTask(task, section);
  }

  deleteTask(taskId: string) {
    if (window.confirm('タスクを削除しますか？')) {
      this.usecase.deleteTask(taskId);
    }
  }
}
