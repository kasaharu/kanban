import { ChangeDetectionStrategy, Component, EventEmitter, Input, Output } from '@angular/core';
import { Task } from '../../../../domain/task/task';

@Component({
  selector: 'app-task-card',
  templateUrl: './task-card.component.html',
  styleUrls: ['./task-card.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  standalone: true,
})
export class TaskCardComponent {
  @Input()
  task!: Task;
  @Output()
  deleteButtonClicked = new EventEmitter<string>();

  onDeleteButtonClick(taskId: string) {
    this.deleteButtonClicked.emit(taskId);
  }
}
