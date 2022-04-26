import { Injectable } from '@angular/core';
import {AngularFirestore} from '@angular/fire/compat/firestore'
import { Comment, Rating } from '../models/Social';

@Injectable({
  providedIn: 'root'
})
export class CommentService {

  constructor(private afs: AngularFirestore) { }

  collectionName = 'Comments'

  async create(comment : Comment){
    // GETTING USER REF FROM CURRENT LOGGED IN USER
    let currentUserId = JSON.parse(localStorage.getItem('user')!).uid;
    comment.userId = currentUserId

    await this.afs.collection<Comment>(this.collectionName).add(comment).then(ref=>{
      comment.id = ref.id;
    })
    return this.update(comment)
  }

  getAllByTorrentId(torrentId : string){
    return this.afs.collection<Comment>(this.collectionName, ref => ref.where('torrentId', '==', torrentId).orderBy('date_added', 'asc')).valueChanges();
  }

  getAll() {
    return this.afs.collection<Comment>(this.collectionName).valueChanges();
  }

  getById(id: string) {
    return this.afs.collection<Comment>(this.collectionName).doc(id).valueChanges();
  }

  update(user: Comment) {
    return this.afs.collection<Comment>(this.collectionName).doc(user.id).set(user);
  }

  delete(id: string) {
    console.log("DELETING COMMENT: ", id)
    return this.afs.collection<Comment>(this.collectionName).doc(id).delete();
  }

  getRatingsForComment(comment : Comment){
    return this.afs.collection<Rating>('Ratings', ref => ref.where('commentId', '==', comment.id)).valueChanges();
  }

  async createRating(rating : Rating){
    await this.afs.collection<Rating>('Ratings').add(rating).then(ref=>{
      rating.id = ref.id;
    });
    return this.updateRating(rating);
  }

  updateRating(rating: Rating){
    return this.afs.collection<Rating>('Ratings').doc(rating.id).set(rating);
  }

  deleteRating(rating:Rating){
    console.log("DELETING RATING: ", rating.id)
    return this.afs.collection<Rating>('Ratings').doc(rating.id).delete();
  }

}
