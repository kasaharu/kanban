import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  selector: 'app-board-page',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './board-page.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export default class BoardPageComponent {}
