import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { COLLECTION_NAME, Section } from '../../domain/section/section.vo';
import { DatabaseAdapter } from '../adapters/database.adapter';

@Injectable({
  providedIn: 'root',
})
export class SectionGateway {
  constructor(private readonly _databaseAdapter: DatabaseAdapter) {}

  getSections(ownerId: string): Observable<Section[]> {
    return this._databaseAdapter.fetchCollectionWhere<Section>(COLLECTION_NAME, { key: 'ownerId', value: ownerId });
  }

  postSection(section: Section): Promise<Section> {
    return this._databaseAdapter.createDocument<Section>(COLLECTION_NAME, section);
  }

  putSection(section: Section): Promise<void> {
    return this._databaseAdapter.updateDocument(COLLECTION_NAME, section, section.id);
  }

  deleteSection(section: Section) {
    return this._databaseAdapter.deleteDocument(COLLECTION_NAME, section.id);
  }
}
