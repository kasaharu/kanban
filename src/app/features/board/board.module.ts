import { DragDropModule } from '@angular/cdk/drag-drop';
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { StoreModule } from '@ngrx/store';
import { SectionsComponent } from './containers/sections/sections.component';
import { BoardComponent } from './pages/board/board.component';
import { default as reducer, featureName } from './store/board.store';
import { NewTaskFormComponent } from './ui/components/new-task-form/new-task-form.component';
import { SectionFormComponent } from './ui/components/section-form/section-form.component';
import { TaskCardComponent } from './ui/components/task-card/task-card.component';

@NgModule({
  declarations: [BoardComponent, SectionsComponent, SectionFormComponent, TaskCardComponent, NewTaskFormComponent],
  imports: [CommonModule, ReactiveFormsModule, DragDropModule, StoreModule.forFeature(featureName, reducer)],
  exports: [BoardComponent],
})
export class BoardModule {}
