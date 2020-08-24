import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EditableSectionNameComponent } from './editable-section-name.component';

describe('EditableSectionNameComponent', () => {
  let component: EditableSectionNameComponent;
  let fixture: ComponentFixture<EditableSectionNameComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EditableSectionNameComponent ],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EditableSectionNameComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
