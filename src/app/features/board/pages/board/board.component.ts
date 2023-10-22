import { CdkDrag, CdkDragDrop, CdkDropList, CdkDropListGroup, moveItemInArray, transferArrayItem } from '@angular/cdk/drag-drop';
import { AsyncPipe, NgFor, NgIf } from '@angular/common';
import { ChangeDetectionStrategy, Component, OnDestroy, OnInit } from '@angular/core';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { SectionHasTasks } from '../../../../domain/models';
import { Section } from '../../../../domain/section/section.vo';
import { Task } from '../../../../domain/task/task';
import { EditableSectionNameComponent } from '../../presenters/editable-section-name/editable-section-name.component';
import { NewTaskFormComponent } from '../../presenters/new-task-form/new-task-form.component';
import { SectionFormComponent } from '../../presenters/section-form/section-form.component';
import { TaskCardComponent } from '../../presenters/task-card/task-card.component';
import { BoardUsecase } from './board.usecase';

@Component({
  templateUrl: './board.component.html',
  styleUrls: ['./board.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [BoardUsecase],
  standalone: true,
  imports: [
    SectionFormComponent,
    NgIf,
    CdkDropList,
    NgFor,
    CdkDropListGroup,
    CdkDrag,
    EditableSectionNameComponent,
    NewTaskFormComponent,
    TaskCardComponent,
    AsyncPipe,
  ],
})
export class BoardComponent implements OnInit, OnDestroy {
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

  addSection(section: Section) {
    this.usecase.addSection(section);
  }

  deleteSection(section: SectionHasTasks) {
    if (window.confirm('セクションを削除しますか？(紐づくタスクも削除されます)')) {
      this.usecase.deleteSection(section);
    }
  }

  changeSectionName(newName: string, section: SectionHasTasks) {
    this.usecase.updateSectionName(newName, section);
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
