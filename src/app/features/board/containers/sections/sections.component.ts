import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { Section } from '../../../../domain/models';
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

  sectionsHasTasks$ = this.query.sectionsHasTasks$;

  ngOnInit(): void {}

  addSection(section: Section) {
    this.usecase.addSection(section);
  }

  deleteTask(taskId: string) {
    this.usecase.deleteTask(taskId);
  }
}
