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
  requestClick = new EventEmitter<string>();

  onClick(taskId: string) {
    this.requestClick.emit(taskId);
  }
}
