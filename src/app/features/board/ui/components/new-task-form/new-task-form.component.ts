import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-new-task-form',
  templateUrl: './new-task-form.component.html',
  styleUrls: ['./new-task-form.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class NewTaskFormComponent implements OnInit {
  constructor() {}

  ngOnInit(): void {}
}
