import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-section-form',
  templateUrl: './section-form.component.html',
  styleUrls: ['./section-form.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SectionFormComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

}
