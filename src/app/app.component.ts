import { Component, OnInit } from '@angular/core';
import { AppInitializerService } from './app-initializer.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit {
  constructor(private appInitializer: AppInitializerService) {}

  readyApp$ = this.appInitializer.readyApp$;

  ngOnInit() {
    this.appInitializer.initialize();
  }
}
