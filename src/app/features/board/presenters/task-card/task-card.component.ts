import { ChangeDetectionStrategy, Component, EventEmitter, HostListener, Input, Output } from '@angular/core';
import { Task } from '../../../../domain/task/task';

@Component({
  selector: 'app-task-card',
  templateUrl: './task-card.component.html',
  styleUrls: ['./task-card.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  standalone: true,
})
export class TaskCardComponent {
  @Input() task!: Task;
  @Output() deleteButtonClicked = new EventEmitter<string>();
  @Output() cardClicked = new EventEmitter<string>();

  @HostListener('click') onCardClick() {
    this.cardClicked.emit(this.task.id);
  }

  onDeleteButtonClick(taskId: string, event: Event) {
    this.deleteButtonClicked.emit(taskId);
    event.stopPropagation();
    event.preventDefault();
  }
}
