import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class DatabaseAdapter {
  constructor(private db: AngularFirestore) {}

  fetchCollectionWhere<T>(collectionName: string, where: { key: string; value: string }): Observable<T[]> {
    return this.db
      .collection<T>(collectionName, (ref) => ref.where(where.key, '==', where.value))
      .valueChanges();
  }
}
