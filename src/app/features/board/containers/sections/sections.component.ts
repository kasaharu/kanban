import { CdkDragDrop, moveItemInArray, transferArrayItem } from '@angular/cdk/drag-drop';
import { ChangeDetectionStrategy, Component, OnDestroy, OnInit } from '@angular/core';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { SectionHasTasks } from '../../../../domain/models';
import { Section } from '../../../../domain/section/section.vo';
import { Task } from '../../../../domain/task/task';
import { AlertDialogService } from '../../../../shared/alert-dialog/services/alert-dialog.service';
import { SectionQuery } from '../../applications/section.query';
import { SectionUsecase } from '../../applications/section.usecase';

@Component({
  selector: 'app-sections',
  templateUrl: './sections.component.html',
  styleUrls: ['./sections.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SectionsComponent implements OnInit, OnDestroy {
  constructor(private query: SectionQuery, private usecase: SectionUsecase, private alertDialogService: AlertDialogService) {}

  sectionsHasTasks$ = this.query.sectionsHasTasks$;
  errorMessage$ = this.query.errorMessage$;
  private _sectionIds!: string[];

  private _onDestroy$ = new Subject();

  ngOnInit(): void {
    this.usecase.fetchSections();
    this.errorMessage$.pipe(takeUntil(this._onDestroy$)).subscribe((message) => {
      this.alertDialogService
        .show('エラーが発生しました', `${message}`)
        .pipe(takeUntil(this._onDestroy$))
        .subscribe(() => this.usecase.closeAlertDialog());
    });
    this.sectionsHasTasks$
      .pipe(takeUntil(this._onDestroy$))
      .subscribe((sectionsHasTasks) => (this._sectionIds = sectionsHasTasks.map((x) => x.id)));
  }

  ngOnDestroy(): void {
    this._onDestroy$.next();
  }

  // NOTE: task が section をまたいで移動するために必要
  getConnectedList() {
    return this._sectionIds;
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

  addTask(task: Task, section: SectionHasTasks) {
    this.usecase.addTask(task, section);
  }

  deleteTask(taskId: string) {
    if (window.confirm('タスクを削除しますか？')) {
      this.usecase.deleteTask(taskId);
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

  dropSection(event: CdkDragDrop<SectionHasTasks[]>) {
    moveItemInArray(event.container.data, event.previousIndex, event.currentIndex);
    this.usecase.moveSection(event.container.data);
  }
}
