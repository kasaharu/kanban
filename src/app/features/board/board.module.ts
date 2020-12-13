import { DragDropModule } from '@angular/cdk/drag-drop';
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { StoreModule } from '@ngrx/store';
import { default as boardStoreReducer, featureName as boardStoreName } from './store/board.store';
import { default as errorStoreReducer, featureName as errorStoreName } from './store/error.store';
import { SectionsComponent } from './ui/containers/sections/sections.component';
import { BoardPageComponent } from './pages/board/board.component';
import { EditableSectionNameComponent } from './ui/presenters/editable-section-name/editable-section-name.component';
import { NewTaskFormComponent } from './ui/presenters/new-task-form/new-task-form.component';
import { SectionFormComponent } from './ui/presenters/section-form/section-form.component';
import { TaskCardComponent } from './ui/presenters/task-card/task-card.component';

@NgModule({
  declarations: [
    BoardPageComponent,
    SectionsComponent,
    SectionFormComponent,
    TaskCardComponent,
    NewTaskFormComponent,
    EditableSectionNameComponent,
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    DragDropModule,
    StoreModule.forFeature(boardStoreName, boardStoreReducer),
    StoreModule.forFeature(errorStoreName, errorStoreReducer),
  ],
  exports: [BoardPageComponent],
})
export class BoardModule {}
