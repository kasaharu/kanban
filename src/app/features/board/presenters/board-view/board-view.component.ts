import { ChangeDetectionStrategy, Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-board-view',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './board-view.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class BoardViewComponent {}
