import { Injectable } from '@angular/core';
import {AngularFirestore} from '@angular/fire/compat/firestore'
import { Observable } from 'rxjs';
import { User, Comment, Rating } from '../models/Social';
import { Torrent } from '../models/Torrent';
import { UserService } from './user.service';

export const TEMP_TORRENT : Torrent = {
  id : '??',
  date_added: new Date(),
  category: 'Software',
  name: '????',
  uploaderId: '???',
  seeders: 0,
  leechers: 0
};

@Injectable({
  providedIn: 'root'
})
export class TorrentService {

  collectionName = "Torrents"
  constructor(private afs: AngularFirestore, private userService:UserService) { }

  async create(torrent : Torrent) : Promise<void>{
    // GETTING USER REF FROM CURRENT LOGGED IN USER
    let currentUserId = JSON.parse(localStorage.getItem('user')!).uid;
    torrent.uploaderId = currentUserId

    await this.afs.collection<Torrent>(this.collectionName).add(torrent).then(ref=>{
      torrent.id = ref.id;
      console.log("updated id")
    })

    return this.update(torrent)
  }

  getAll() {
    return this.afs.collection<Torrent>(this.collectionName).valueChanges();
  }

  getById(id: string) {
    return this.afs.collection<Torrent>(this.collectionName).doc(id).valueChanges() as Observable<Torrent>;
  }

  update(torrent: Torrent) {
    return this.afs.collection<Torrent>(this.collectionName).doc(torrent.id).set(torrent);
  }

  delete(id: string) {
    console.log('DELETING TORRENT: ', id)
    return this.afs.collection<Torrent>(this.collectionName).doc(id).delete();
  }


  
}
