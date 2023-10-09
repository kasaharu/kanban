import { Injectable, inject } from '@angular/core';
import {
  CollectionReference,
  Firestore,
  collection,
  collectionData,
  deleteDoc,
  doc,
  query,
  setDoc,
  updateDoc,
  where,
} from '@angular/fire/firestore';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class DatabaseAdapter {
  #firestore = inject(Firestore);

  fetchCollectionWhere<T>(collectionName: string, whereParams: { key: string; value: string }): Observable<T[]> {
    const collectionRef = collection(this.#firestore, collectionName) as CollectionReference<T>;
    const refQuery = query(collectionRef, where(whereParams.key, '==', whereParams.value));
    return collectionData(refQuery);
  }

  async createDocument<T>(collectionName: string, item: T): Promise<T> {
    const id = doc(collection(this.#firestore, '_')).id;
    const document = { ...item, id } as T;
    this.createDocumentWithId(collectionName, id, document);
    return document;
  }

  async updateDocument(collectionName: string, item: any, itemId: string): Promise<void> {
    const docRef = doc(this.#firestore, `${collectionName}/${itemId}`);
    await updateDoc(docRef, item);
    return;
  }

  async deleteDocument(collectionName: string, itemId: string): Promise<string> {
    const docRef = doc(this.#firestore, `${collectionName}/${itemId}`);
    await deleteDoc(docRef);
    return itemId;
  }

  async createDocumentWithId<T>(collectionName: string, id: string, item: T): Promise<T> {
    const collectionRef = collection(this.#firestore, collectionName) as CollectionReference<T>;
    await setDoc(doc(collectionRef, id), item);
    return item;
  }
}
