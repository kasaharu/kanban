import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
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

  async createDocument<T>(collectionName: string, item: T): Promise<T> {
    const id = this.db.createId();
    const document = { ...item, id } as T;
    await this.db.collection<T>(collectionName).doc(id).set(document);
    return document;
  }

  updateDocument<T>(collectionName: string, item: T, itemId: string): Promise<void> {
    return this.db.doc<T>(`${collectionName}/${itemId}`).update(item);
  }

  async deleteDocument<T>(collectionName: string, itemId: string): Promise<string> {
    await this.db.doc<T>(`${collectionName}/${itemId}`).delete();
    return itemId;
  }
}
