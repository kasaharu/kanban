import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { StoreModule } from '@ngrx/store';
import { SectionsComponent } from './containers/sections/sections.component';
import { BoardComponent } from './pages/board/board.component';
import { default as reducer, featureName } from './store/board.store';
import { SectionFormComponent } from './ui/components/section-form/section-form.component';

@NgModule({
  declarations: [BoardComponent, SectionsComponent, SectionFormComponent],
  imports: [CommonModule, ReactiveFormsModule, StoreModule.forFeature(featureName, reducer)],
  exports: [BoardComponent],
})
export class BoardModule {}
