import { Component } from '@angular/core';
import { TestBed } from '@angular/core/testing';
import { provideRouter } from '@angular/router';
import { RouterTestingHarness } from '@angular/router/testing';
import BoardPageComponent from './board-page.component';
import { BoardComponent } from './containers/board/board.component';

@Component({ selector: 'app-board', standalone: true, template: '' })
class MockBoardComponent {}

describe('BoardPageComponent', () => {
  let harness: RouterTestingHarness;
  let component: BoardPageComponent;

  beforeEach(async () => {
    TestBed.configureTestingModule({
      imports: [BoardPageComponent],
      providers: [provideRouter([{ path: 'board', component: BoardPageComponent }])],
    })
      .overrideComponent(BoardPageComponent, { remove: { imports: [BoardComponent] }, add: { imports: [MockBoardComponent] } })
      .compileComponents();

    harness = await RouterTestingHarness.create();
    component = await harness.navigateByUrl('board', BoardPageComponent);

    harness.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
