import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { COLLECTION_NAME, Task } from '../../domain/task/task';
import { DatabaseAdapter } from '../adapters/database.adapter';

@Injectable({
  providedIn: 'root',
})
export class TaskGateway {
  constructor(private readonly _databaseAdapter: DatabaseAdapter) {}

  getTasks(ownerId: string): Observable<Task[]> {
    return this._databaseAdapter.fetchCollectionWhere<Task>(COLLECTION_NAME, { key: 'ownerId', value: ownerId });
  }

  postTask(task: Task) {
    return this._databaseAdapter.createDocument<Task>(COLLECTION_NAME, task);
  }

  putTask(task: Task) {
    return this._databaseAdapter.updateDocument(COLLECTION_NAME, task, task.id);
  }

  deleteTask(taskId: string) {
    return this._databaseAdapter.deleteDocument(COLLECTION_NAME, taskId);
  }
}
