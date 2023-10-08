import { ChangeDetectionStrategy, Component, EventEmitter, Output } from '@angular/core';
import { UntypedFormBuilder, Validators, ReactiveFormsModule } from '@angular/forms';
import { Task } from '../../../../domain/task/task';

@Component({
  selector: 'app-new-task-form',
  templateUrl: './new-task-form.component.html',
  styleUrls: ['./new-task-form.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  standalone: true,
  imports: [ReactiveFormsModule],
})
export class NewTaskFormComponent {
  constructor(private fb: UntypedFormBuilder) {}
  // TODO: 型の見直しが必要
  @Output()
  requestCreateTask = new EventEmitter<Task>();

  placeholderText = '新しいタスクを作成';
  newTaskForm = this.fb.group({ id: [''], name: ['', Validators.required] });

  onSubmit() {
    this.requestCreateTask.emit(this.newTaskForm.value);
    this.newTaskForm.reset();
  }
}
