import { ChangeDetectionStrategy, Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { NAME_MAX_LENGTH } from '../../../domain/section';

@Component({
  selector: 'app-editable-section-name',
  templateUrl: './editable-section-name.component.html',
  styleUrls: ['./editable-section-name.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class EditableSectionNameComponent implements OnInit {
  constructor(private fb: FormBuilder) {}

  @Input()
  name = '';
  @Output()
  editName = new EventEmitter<string>();

  editableName = this.fb.group({ name: ['', [Validators.required, Validators.maxLength(NAME_MAX_LENGTH)]] });

  ngOnInit(): void {
    this.editableName.setValue({ name: this.name });
  }

  onSubmit() {
    this.editName.emit(this.editableName.value.name);
  }
}