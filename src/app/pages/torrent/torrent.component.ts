import { Component, OnInit,AfterViewInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Torrent } from '../../shared/models/Torrent';
import { User, Rating, Comment } from '../../shared/models/Social';
import { CommentService } from '../../shared/services/comment.service';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { TorrentService, TEMP_TORRENT } from '../../shared/services/torrent.service';
import { UserService, TEMP_USER } from '../../shared/services/user.service';
import { Timestamp } from '@angular/fire/firestore';



@Component({
  selector: 'app-torrent',
  templateUrl: './torrent.component.html',
  styleUrls: ['./torrent.component.scss']
})
export class TorrentComponent implements OnInit {
  //TODO: RATING
  constructor(private activeRoute:ActivatedRoute, private router: Router, private torrentService : TorrentService, private commentService : CommentService, private userService : UserService) { }
  
  id : string = '';
  sub: any;
  loading: boolean = false;
  currentOwner:boolean = false;

  torrent : Torrent = TEMP_TORRENT;
  user : User = TEMP_USER;
  comments : Comment[] = [];

  newCommentForm = new FormGroup({
    content: new FormControl('', [Validators.required])
  })

  ngOnInit(): void {
    let currentUserId = JSON.parse(localStorage.getItem('user')!).uid;

    this.sub = this.activeRoute.paramMap.subscribe(params => {
      this.id = params.get('id')!;
    });

    this.torrentService.getById(this.id).subscribe(torrent => {
      this.torrent = torrent;
      this.torrent.date_added = (this.torrent.date_added as unknown as Timestamp).toDate() // XD

      this.userService.getById(torrent.uploaderId).subscribe(user=>{
        this.user = user;
        this.currentOwner = (currentUserId == this.torrent.uploaderId);
      })
    }) 


    this.commentService.getAllByTorrentId(this.id).subscribe(comments => {
      this.comments = comments;
    })

    
  }

  toEdit(){
    this.router.navigate(['/edit-torrent', this.id]);
  }

  createComment(){
    let comment : Comment = {
      id: '',
      userId: '',
      content: this.newCommentForm.get('content')?.value,
      date_added: new Date(),
      torrentId: this.id,
    }
    this.newCommentForm.get('content')?.setValue('')
    this.commentService.create(comment);
    
  }
}
