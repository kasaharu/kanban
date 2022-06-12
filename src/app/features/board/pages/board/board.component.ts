import { ChangeDetectionStrategy, Component } from '@angular/core';
import { BoardUsecase } from './board.usecase';

@Component({
  // template: `<app-sections></app-sections>`,
  templateUrl: './board.component.html',
  styleUrls: ['./board.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [BoardUsecase],
})
export class BoardPageComponent {}
