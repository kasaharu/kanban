import { DragDropModule } from '@angular/cdk/drag-drop';
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { StoreModule } from '@ngrx/store';
import { SectionsComponent } from './containers/sections/sections.component';
import { BoardPageComponent } from './pages/board/board.component';
import { EditableSectionNameComponent } from './presenters/editable-section-name/editable-section-name.component';
import { NewTaskFormComponent } from './presenters/new-task-form/new-task-form.component';
import { SectionFormComponent } from './presenters/section-form/section-form.component';
import { TaskCardComponent } from './presenters/task-card/task-card.component';
import { default as boardStoreReducer, featureName as boardStoreName } from './store/board.store';
import { default as errorStoreReducer, featureName as errorStoreName } from './store/error.store';

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
