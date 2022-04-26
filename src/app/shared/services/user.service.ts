import { Injectable } from '@angular/core';
import {AngularFirestore} from '@angular/fire/compat/firestore'
import { User } from '../models/Social';
import { Observable } from 'rxjs';


export const TEMP_USER : User = {
  id:'?',
  date_added : new Date(),
  username:'?',
  email:'?'
};

@Injectable({
  providedIn: 'root'
})
export class UserService {
  collectionName = 'Users'

  constructor(private afs: AngularFirestore) { }

  create(user:User){
    return this.afs.collection<User>(this.collectionName).doc(user.id).set(user)
  }

  getUsername(uid : string) {
    return (this.afs.doc(`Users/${uid}`).get())
  }

  getAll() {
    return this.afs.collection<User>(this.collectionName).valueChanges();
  }

  getById(id: string) {
    return this.afs.collection<User>(this.collectionName).doc(id).valueChanges() as Observable<User>;
  } 

  update(user: User) {
    return this.afs.collection<User>(this.collectionName).doc(user.id).set(user);
  }

  delete(id: string) {
    return this.afs.collection<User>(this.collectionName).doc(id).delete();
  }

}
