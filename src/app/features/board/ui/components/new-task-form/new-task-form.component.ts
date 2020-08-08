import { ChangeDetectionStrategy, Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Task } from 'src/app/domain/models';

@Component({
  selector: 'app-new-task-form',
  templateUrl: './new-task-form.component.html',
  styleUrls: ['./new-task-form.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class NewTaskFormComponent implements OnInit {
  constructor(private fb: FormBuilder) {}
  // TODO: 型の見直しが必要
  @Output()
  requestCreateTask = new EventEmitter<Task>();

  newTaskForm = this.fb.group({
    id: [''],
    name: ['', Validators.required],
  });
  placeholderText = '新しいタスクを作成';

  ngOnInit(): void {}

  onSubmit() {
    this.requestCreateTask.emit(this.newTaskForm.value);
    this.newTaskForm.reset();
  }
}
