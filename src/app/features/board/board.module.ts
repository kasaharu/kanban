import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { StoreModule } from '@ngrx/store';
import { SectionsComponent } from './containers/sections/sections.component';
import { BoardComponent } from './pages/board/board.component';
import { default as reducer, featureName } from './store/board.store';

@NgModule({
  declarations: [BoardComponent, SectionsComponent],
  imports: [CommonModule, StoreModule.forFeature(featureName, reducer)],
  exports: [BoardComponent],
})
export class BoardModule {}
