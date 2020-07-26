import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { BoardQuery } from '../../applications/board.query';

@Component({
  selector: 'app-sections',
  templateUrl: './sections.component.html',
  styleUrls: ['./sections.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SectionsComponent implements OnInit {
  constructor(private query: BoardQuery) {}

  sections$ = this.query.sections$;

  ngOnInit(): void {}
}
