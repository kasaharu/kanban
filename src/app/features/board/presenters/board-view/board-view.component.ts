import { CdkDrag, CdkDragDrop, CdkDropList, CdkDropListGroup } from '@angular/cdk/drag-drop';
import { NgFor } from '@angular/common';
import { ChangeDetectionStrategy, Component, EventEmitter, Input, Output } from '@angular/core';
import { SectionHasTasks } from '../../../../domain/models';
import { Task } from '../../../../domain/task/task';
import { EditableSectionNameComponent } from '../editable-section-name/editable-section-name.component';
import { NewTaskFormComponent } from '../new-task-form/new-task-form.component';
import { TaskCardComponent } from '../task-card/task-card.component';

@Component({
  selector: 'app-board-view',
  standalone: true,
  imports: [NgFor, EditableSectionNameComponent, NewTaskFormComponent, TaskCardComponent, CdkDrag, CdkDropList, CdkDropListGroup],
  templateUrl: './board-view.component.html',
  styleUrls: ['./board-view.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class BoardViewComponent {
  @Input({ required: true }) sections!: SectionHasTasks[];
  @Input({ required: true }) connectedListIds!: string[];
  @Output() sectionDropped = new EventEmitter<CdkDragDrop<SectionHasTasks[]>>();
  @Output() taskDropped = new EventEmitter<CdkDragDrop<Task[]>>();
  @Output() nameEdited = new EventEmitter<{ newName: string; section: SectionHasTasks }>();
  @Output() sectionDeleted = new EventEmitter<SectionHasTasks>();
  @Output() taskAdded = new EventEmitter<{ task: Task; section: SectionHasTasks }>();
  @Output() taskDeleted = new EventEmitter<string>();

  sectionDrop(event: CdkDragDrop<SectionHasTasks[]>) {
    this.sectionDropped.emit(event);
  }

  taskDrop(event: CdkDragDrop<Task[]>) {
    this.taskDropped.emit(event);
  }

  editName(newName: string, section: SectionHasTasks) {
    this.nameEdited.emit({ newName, section });
  }

  deleteSection(section: SectionHasTasks) {
    this.sectionDeleted.emit(section);
  }

  addTask(task: Task, section: SectionHasTasks) {
    this.taskAdded.emit({ task, section });
  }

  deleteTask(taskId: string) {
    this.taskDeleted.emit(taskId);
  }
}
