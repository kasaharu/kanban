import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { SectionUsecase } from '../../../applications/section.usecase';

@Component({
  selector: 'app-board',
  templateUrl: './board.component.html',
  styleUrls: ['./board.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class BoardComponent implements OnInit {
  constructor(private sectionUsecase: SectionUsecase) {}

  ngOnInit(): void {
    this.sectionUsecase.fetchSections();
  }
}
