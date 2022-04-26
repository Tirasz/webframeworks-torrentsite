import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Torrent } from '../../shared/models/Torrent';
import { TorrentService } from '../../shared/services/torrent.service';
import { MessageService } from '../../shared/services/message.service';
import { Router } from '@angular/router';

/*export interface Torrent{
  id: number,
  date_added: Date
  uploader: User,
  name: string,
  seeders: number,
  leechers: number,
  category?: "Software" | "Movie" | "Video game" | "Book" | "XXX", 
  comments?: Comment[]
}
*/
@Component({
  selector: 'app-create-torrent',
  templateUrl: './create-torrent.component.html',
  styleUrls: ['./create-torrent.component.scss']
})
export class CreateTorrentComponent implements OnInit {
  loading : boolean = false;
  categories = ["Software", "Movie" , "Video game" , "Book" , "XXX"]
  newTorrentForm = new FormGroup({
    name : new FormControl('', [Validators.required, Validators.minLength(3), Validators.maxLength(40)]),
    category: new FormControl('', [Validators.required])
  })

  constructor(private torrentService: TorrentService, private messageService : MessageService, private router : Router) { }

  ngOnInit(): void {
  }

  //TODO: Create torrent
  createTorrent(){
    const torrent : Torrent = {
      id : '?',
      uploaderId : '??',
      category : this.newTorrentForm.get('category')!.value,
      name : this.newTorrentForm.get('name')!.value,
      leechers : Math.floor(Math.random() * 101),
      seeders : Math.floor(Math.random() * 101), 
      date_added: new Date()
    }
    this.loading = true;
    this.torrentService.create(torrent).then(() =>{
      this.loading = false;
      this.messageService.changeMessage('success', 'Succesfully uploaded torrent', 'Click to dismiss...');
      this.router.navigateByUrl('/browser')
    })
  }

}
