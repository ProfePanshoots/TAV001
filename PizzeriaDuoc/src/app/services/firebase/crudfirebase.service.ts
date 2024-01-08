import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { Ipizza } from 'src/app/interfaces/ipizza';
import { Ipizzas } from 'src/app/interfaces/ipizzas';

@Injectable({
  providedIn: 'root'
})
export class CrudfirebaseService {

  constructor(private fire: AngularFirestore) { }

  getCollection(collectionName:string) {
    return this.fire.collection<Ipizza>(collectionName).valueChanges({ idField: 'id'});
  }

  createDocument(collectionName:string, data:Ipizza) {
    return this.fire.collection<Ipizza>(collectionName).add(data);
  }

  updateDocument(collectionName:string, data:Ipizza, documentId:string) {
    return this.fire.collection<Ipizza>(collectionName).doc(documentId).update(data);
  }

  deleteDocument(collectionName:string, documentId:string) {
    return this.fire.collection<Ipizzas>(collectionName).doc(documentId).delete();
  }

  getPizzaById(collectionName:string, documentId:string) {
    return this.fire.collection<Ipizzas>(collectionName).doc(documentId).valueChanges();
  }
}
