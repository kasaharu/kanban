import { ChangeDetectionStrategy, Component, OnDestroy, OnInit } from '@angular/core';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { BoardUsecase } from './board.usecase';

@Component({
  // template: `<app-sections></app-sections>`,
  templateUrl: './board.component.html',
  styleUrls: ['./board.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [BoardUsecase],
})
export class BoardPageComponent implements OnInit, OnDestroy {
  constructor(private usecase: BoardUsecase) {}

  private _onDestroy$ = new Subject();
  private _sectionIds!: string[];

  sectionsHasTasks$ = this.usecase.sectionsHasTasks$;

  ngOnInit(): void {
    this.sectionsHasTasks$.pipe(takeUntil(this._onDestroy$)).subscribe((sectionsHasTasks) => {
      this._sectionIds = sectionsHasTasks.map((x) => x.id);
    });
    this.usecase.fetchBoardItem();
  }

  ngOnDestroy(): void {
    this._onDestroy$.next();
  }

  // NOTE: task が section をまたいで移動するために必要
  getConnectedList() {
    return this._sectionIds;
  }
}
