import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-editable-section-name',
  templateUrl: './editable-section-name.component.html',
  styleUrls: ['./editable-section-name.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class EditableSectionNameComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

}
