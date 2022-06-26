import { DragDropModule } from '@angular/cdk/drag-drop';
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { BoardPageComponent } from './pages/board/board.component';
import { EditableSectionNameComponent } from './presenters/editable-section-name/editable-section-name.component';
import { NewTaskFormComponent } from './presenters/new-task-form/new-task-form.component';
import { SectionFormComponent } from './presenters/section-form/section-form.component';
import { TaskCardComponent } from './presenters/task-card/task-card.component';

@NgModule({
  declarations: [BoardPageComponent, SectionFormComponent, TaskCardComponent, NewTaskFormComponent, EditableSectionNameComponent],
  imports: [CommonModule, ReactiveFormsModule, DragDropModule],
  exports: [BoardPageComponent],
})
export class BoardModule {}
