import { CdkDragDrop, moveItemInArray, transferArrayItem } from '@angular/cdk/drag-drop';
import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { Section, SectionHasTasks, Task } from '../../../../../domain/models';
import { SectionQuery } from '../../../applications/section.query';
import { SectionUsecase } from '../../../applications/section.usecase';

@Component({
  selector: 'app-sections',
  templateUrl: './sections.component.html',
  styleUrls: ['./sections.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SectionsComponent implements OnInit {
  constructor(private query: SectionQuery, private usecase: SectionUsecase) {}

  sectionsHasTasks$ = this.query.sectionsHasTasks$;

  ngOnInit(): void {
    this.usecase.fetchSections();
  }

  addSection(section: Section) {
    this.usecase.addSection(section);
  }

  deleteSection(section: SectionHasTasks) {
    if (window.confirm('セクションを削除しますか？(紐づくタスクも削除されます)')) {
      this.usecase.deleteSection(section);
    }
  }

  changeSectionName(newName: string, section: Section) {
    console.log('[debug] ----- change section name: ', newName, section);
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

  drop(event: CdkDragDrop<Task[]>) {
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
}
