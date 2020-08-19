import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { TaskCardComponent } from './task-card.component';

describe('TaskCardComponent', () => {
  let component: TaskCardComponent;
  let fixture: ComponentFixture<TaskCardComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [TaskCardComponent],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TaskCardComponent);
    component = fixture.componentInstance;
    component.task = { id: '1', name: 'sample', sectionId: '1', userId: '1', orderId: 1 };
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
