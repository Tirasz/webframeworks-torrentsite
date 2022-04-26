import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FormControl, Validators, FormGroup } from '@angular/forms';
import { TorrentService, TEMP_TORRENT } from '../../shared/services/torrent.service';
import { Torrent } from '../../shared/models/Torrent';
import { CommentService } from '../../shared/services/comment.service';
import { Comment, Rating } from '../../shared/models/Social';
import { MessageService } from '../../shared/services/message.service';
import { timeStamp } from 'console';
@Component({
  selector: 'app-edit-torrent',
  templateUrl: './edit-torrent.component.html',
  styleUrls: ['./edit-torrent.component.scss']
})
export class EditTorrentComponent implements OnInit {

  loading : boolean = false;
  categories = ["Software", "Movie" , "Video game" , "Book" , "XXX"]
  editTorrentForm = new FormGroup({
    name : new FormControl('PLACEHOLDER', [Validators.required, Validators.minLength(3), Validators.maxLength(40)]),
    category: new FormControl('PLACEHOLDER', [Validators.required])
  })

  constructor(private activeRoute:ActivatedRoute, private torrentService : TorrentService, private commentService : CommentService, private msgService : MessageService, private router:Router) { }

  sub:any;
  id:string = '?';

  torrent : Torrent = TEMP_TORRENT;
  comments : Comment[] = []
  ratings : Rating[] = []

  ngOnInit(): void {
    this.sub = this.activeRoute.paramMap.subscribe(params => {
      this.id = params.get('id')!;
    });

    this.torrentService.getById(this.id).subscribe(torrent => {
      this.torrent = torrent; //Torrent by ID
      this.editTorrentForm.get('name')?.setValue(torrent.name);
      this.editTorrentForm.get('category')?.setValue(torrent.category);

      this.commentService.getAllByTorrentId(torrent.id).subscribe(comments=>{
        this.comments = comments; //Comments by Torrent
        comments.forEach(comment => {

          //Foreach comment get their ratings
          this.commentService.getRatingsForComment(comment).subscribe(ratings=>{
             ratings.forEach(rating => {
               this.ratings.push(rating)

             });
          })
        });
      })
    }) 

    

  }


  updateTorrent(){
    this.loading = true;
    let newName = this.editTorrentForm.get('name')?.value;
    let newCategory = this.editTorrentForm.get('category')?.value;
    let editedTorrent : Torrent = {
      id:this.torrent.id,
      date_added:this.torrent.date_added,
      category:newCategory,
      name:newName,
      seeders: this.torrent.seeders,
      leechers: this.torrent.leechers,
      uploaderId:this.torrent.uploaderId
    }

    this.torrentService.update(editedTorrent).then(()=>{
      this.router.navigateByUrl('/browser');
      this.msgService.changeMessage('success', 'Torrent edited', 'Click to dismiss...');
      this.loading = false
    })

  }

  deleteTorrent(){
    this.loading = true;
    
    this.torrentService.delete(this.torrent.id).then(() =>{

      this.comments.forEach(comment => {
        this.commentService.delete(comment.id)
      });
      
      this.ratings.forEach(rating => {
        this.commentService.deleteRating(rating)
      });

    }).finally(()=>{
      this.router.navigateByUrl('/browser');
      this.msgService.changeMessage('success', 'Torrent deleted', 'Click to dismiss...');
      this.loading = false;
    })



  }

}
