import { CdkDragDrop, moveItemInArray, transferArrayItem } from '@angular/cdk/drag-drop';
import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { Section, SectionHasTasks, Task } from '../../../../domain/models';
import { BoardQuery } from '../../applications/board.query';
import { SectionUsecase } from '../../applications/section.usecase';

@Component({
  selector: 'app-sections',
  templateUrl: './sections.component.html',
  styleUrls: ['./sections.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SectionsComponent implements OnInit {
  constructor(private query: BoardQuery, private usecase: SectionUsecase) {}

  sectionsHasTasks$ = this.query.sectionsHasTasks$;

  ngOnInit(): void {}

  addSection(section: Section) {
    this.usecase.addSection(section);
  }

  addTask(task: Task, section: SectionHasTasks) {
    this.usecase.addTask(task, section);
  }

  deleteTask(taskId: string) {
    this.usecase.deleteTask(taskId);
  }

  drop(event: CdkDragDrop<SectionHasTasks[]>) {
    if (event.previousContainer === event.container) {
      moveItemInArray(event.container.data, event.previousIndex, event.currentIndex);
    } else {
      transferArrayItem(event.previousContainer.data, event.container.data, event.previousIndex, event.currentIndex);
    }
  }
}
