import { Component, OnInit } from '@angular/core';
import { AppInitializeUsecase } from './features/app-shell/applications/app-initialize.usecase';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit {
  constructor(private usecase: AppInitializeUsecase) {}

  title = 'kanban';

  ngOnInit() {
    this.usecase.initialize();
  }
}
