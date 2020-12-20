import { Component, OnInit } from '@angular/core';
import { AppInitializer } from './core/app-shell/applications/app-initialize.usecase';
import { AppShellQuery } from './core/app-shell/applications/app-shell.query';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit {
  constructor(private query: AppShellQuery, private usecase: AppInitializer) {}

  title = 'kanban';
  readyApp$ = this.query.readyApp$;
  loggedIn$ = this.query.loggedIn$;

  ngOnInit() {
    this.usecase.initialize();
  }
}
