import { ChangeDetectionStrategy, Component, EventEmitter, Output } from '@angular/core';
import { UntypedFormBuilder, Validators } from '@angular/forms';
import { Section } from '../../../../domain/section/section.vo';

@Component({
  selector: 'app-section-form',
  templateUrl: './section-form.component.html',
  styleUrls: ['./section-form.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SectionFormComponent {
  constructor(private fb: UntypedFormBuilder) {}
  // TODO: 型の見直しが必要
  @Output()
  requestCreateSection = new EventEmitter<Section>();

  placeholderText = 'セクションを作成';
  sectionForm = this.fb.group({ id: [''], name: ['', Validators.required] });

  onSubmit() {
    this.requestCreateSection.emit(this.sectionForm.value);
    this.sectionForm.reset();
  }
}
