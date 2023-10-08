import { Component, OnInit } from '@angular/core';
import { AppInitializerService } from './app-initializer.service';
import { RouterOutlet } from '@angular/router';
import { NgIf, AsyncPipe } from '@angular/common';

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.scss'],
    standalone: true,
    imports: [
        NgIf,
        RouterOutlet,
        AsyncPipe,
    ],
})
export class AppComponent implements OnInit {
  constructor(private appInitializer: AppInitializerService) {}

  readyApp$ = this.appInitializer.readyApp$;

  ngOnInit() {
    this.appInitializer.initialize();
  }
}
