import { NgIf } from '@angular/common';
import { ChangeDetectionStrategy, Component, EventEmitter, Output } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { NAME_MAX_LENGTH } from '../../../../domain/section/section.vo';

@Component({
  selector: 'app-section-form',
  templateUrl: './section-form.component.html',
  styleUrls: ['./section-form.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  standalone: true,
  imports: [NgIf, ReactiveFormsModule],
})
export class SectionFormComponent {
  @Output() requestCreateSection = new EventEmitter<string>();
  nameMaxLength = NAME_MAX_LENGTH;

  sectionForm = new FormGroup({
    name: new FormControl('', { nonNullable: true, validators: [Validators.required, Validators.maxLength(this.nameMaxLength)] }),
  });

  onSubmit() {
    if (this.sectionForm.invalid) {
      return;
    }

    const { name } = this.sectionForm.getRawValue();
    this.requestCreateSection.emit(name);
    this.sectionForm.reset();
  }
}
