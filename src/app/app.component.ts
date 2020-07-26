import { Component, OnInit } from '@angular/core';
import { AppInitializeUsecase } from './features/app-shell/applications/app-initialize.usecase';
import { AppShellQuery } from './features/app-shell/applications/app-shell.query';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit {
  constructor(private query: AppShellQuery, private usecase: AppInitializeUsecase) {}

  title = 'kanban';
  readyApp$ = this.query.readyApp$;

  ngOnInit() {
    this.usecase.initialize();
  }
}
