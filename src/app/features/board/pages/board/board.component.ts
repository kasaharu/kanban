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

  sections$ = this.usecase.sections$;
  tasks$ = this.usecase.tasks$;

  ngOnInit(): void {
    this.sections$.subscribe((val) => console.log(val));
    this.tasks$.subscribe((val) => console.log(val));
    this.usecase.fetchBoardItem();
  }
}
