import { ChangeDetectionStrategy, Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-board-page',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './board-page.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class BoardPageComponent {

}
