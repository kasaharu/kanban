import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { BoardUsecase } from './board.usecase';

@Component({
  // template: `<app-sections></app-sections>`,
  templateUrl: './board.component.html',
  styleUrls: ['./board.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [BoardUsecase],
})
export class BoardPageComponent implements OnInit {
  constructor(private usecase: BoardUsecase) {}

  sectionsHasTasks$ = this.usecase.sectionsHasTasks$;

  ngOnInit(): void {
    this.sectionsHasTasks$.subscribe((val) => console.log(val));
    this.usecase.fetchBoardItem();
  }
}
