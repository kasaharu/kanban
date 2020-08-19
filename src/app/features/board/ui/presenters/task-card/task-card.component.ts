import { ChangeDetectionStrategy, Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Task } from '../../../../../domain/models';

@Component({
  selector: 'app-task-card',
  templateUrl: './task-card.component.html',
  styleUrls: ['./task-card.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TaskCardComponent implements OnInit {
  constructor() {}

  @Input()
  task!: Task;
  @Output()
  requestClick = new EventEmitter<string>();

  ngOnInit(): void {}

  onClick(taskId: string) {
    this.requestClick.emit(taskId);
  }
}
