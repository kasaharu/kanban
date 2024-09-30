import { Component } from '@angular/core';
import { TestBed } from '@angular/core/testing';
import { provideRouter } from '@angular/router';
import { RouterTestingHarness } from '@angular/router/testing';
import { routes } from '../../app.routes';
import { HomeComponent } from './containers/home/home.component';
import HomePageComponent from './home-page.component';

@Component({ selector: 'app-home', standalone: true, template: '' })
class MockHomeComponent {}

describe('HomePageComponent', () => {
  let harness: RouterTestingHarness;
  let component: HomePageComponent;

  beforeEach(async () => {
    TestBed.configureTestingModule({
      imports: [HomePageComponent],
      providers: [provideRouter(routes)],
    }).overrideComponent(HomePageComponent, { remove: { imports: [HomeComponent] }, add: { imports: [MockHomeComponent] } });

    harness = await RouterTestingHarness.create();
    component = await harness.navigateByUrl('', HomePageComponent);

    harness.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
