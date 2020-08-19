import { ChangeDetectionStrategy, Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Section } from '../../../../../domain/models';

@Component({
  selector: 'app-section-form',
  templateUrl: './section-form.component.html',
  styleUrls: ['./section-form.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SectionFormComponent implements OnInit {
  constructor(private fb: FormBuilder) {}
  @Output()
  requestCreateSection = new EventEmitter<Section>();

  sectionForm = this.fb.group({
    id: [''],
    name: ['', Validators.required],
  });
  placeholderText = 'セクションを作成';

  ngOnInit(): void {}

  onSubmit() {
    this.requestCreateSection.emit(this.sectionForm.value);
    this.sectionForm.reset();
  }
}
