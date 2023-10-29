import { ChangeDetectionStrategy, Component } from '@angular/core';
import { BoardComponent } from './containers/board/board.component';

@Component({
  selector: 'app-board-page',
  standalone: true,
  imports: [BoardComponent],
  template: `<app-board></app-board>`,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export default class BoardPageComponent {}
