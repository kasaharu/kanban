import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { BoardQuery } from '../../applications/board.query';
import { SectionUsecase } from '../../applications/section.usecase';

@Component({
  selector: 'app-sections',
  templateUrl: './sections.component.html',
  styleUrls: ['./sections.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SectionsComponent implements OnInit {
  constructor(private query: BoardQuery, private usecase: SectionUsecase) {}

  sections$ = this.query.sections$;

  ngOnInit(): void {}

  addSection() {
    this.usecase.addSection();
  }
}
