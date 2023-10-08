import { NgIf } from '@angular/common';
import { Component, OnInit, computed, inject } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { AppInitializerService } from './app-initializer.service';
import { HeaderComponent } from './core/app-shell/containers/header/header.component';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  standalone: true,
  imports: [NgIf, RouterOutlet, HeaderComponent],
})
export class AppComponent implements OnInit {
  #appInitializer = inject(AppInitializerService);

  $readyApp = computed(() => this.#appInitializer.$readyApp());

  ngOnInit() {
    this.#appInitializer.initialize();
  }
}
