import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { SectionsComponent } from './containers/sections/sections.component';
import { BoardComponent } from './pages/board/board.component';

@NgModule({
  declarations: [BoardComponent, SectionsComponent],
  imports: [CommonModule],
  exports: [BoardComponent],
})
export class BoardModule {}
