import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  templateUrl: './board.component.html',
  styleUrls: ['./board.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class BoardPageComponent {}
