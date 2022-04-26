import { Component, OnInit, Input } from '@angular/core';
import { User, Rating, Comment } from '../models/Social';
import { CommentService } from '../services/comment.service';
import { SumPipe } from '../pipes/sum.pipe';
import { Timestamp } from '@angular/fire/firestore';
import { UserService } from '../services/user.service';

@Component({
  selector: 'app-comment',
  templateUrl: './comment.component.html',
  styleUrls: ['./comment.component.scss']
})
export class CommentComponent implements OnInit {


  @Input() comment : Comment = {
    id :'?',
    userId : '?',
    torrentId : '?',
    content : '?',
    date_added : new Date()
  };

  user : User = {
    id:'?',
    date_added : new Date(),
    username:'?',
    email:'?'
  };

  ratings : Rating[] = []
  currentUserId : string = '?'
  currentUserRating : Rating = {userId:'?', value:0, commentId:'?', id:'?'};

  constructor(private commentService: CommentService, private userService : UserService) { }

  ngOnInit(): void {
    this.currentUserId = JSON.parse(localStorage.getItem('user')!).uid;

    this.commentService.getRatingsForComment(this.comment).subscribe(ratings => {
      this.ratings = ratings;
      this.ratings.forEach(rating => {
        if(rating.userId == this.currentUserId){
          this.currentUserRating = rating;
        }
      });
    })

    this.userService.getById(this.comment.userId).subscribe(user => {
      this.user = user;
    })

    this.comment.date_added = (this.comment.date_added as unknown as Timestamp).toDate() // XD

  }

  rate(value:1|-1){
    console.log('RATED COMMENT: ', this.comment.content, 'USER: ', this.currentUserId, 'VALUE: ', value)
    if(this.currentUserRating.value == 0){
      // User hasnt rated this comment yet
      let rating : Rating = {userId:this.currentUserId, commentId:this.comment.id, value:value, id:'?'}
      this.commentService.createRating(rating)
    }
    else if (value == this.currentUserRating.value){
      // User has rated, but cancels
      this.commentService.deleteRating(this.currentUserRating);
      this.currentUserRating.value = 0
    }
    else{
      // User has rated, updates 
      let rating : Rating = {id:this.currentUserRating.id, commentId:this.comment.id, value:value, userId:this.currentUserId}
      console.log(rating)
      this.commentService.updateRating(rating);
    }
    
    
  }

}
