import { AfterViewInit, Component, OnInit, ViewChild, AfterContentChecked } from '@angular/core';
import { Torrent } from '../../shared/models/Torrent'
import {User, Rating, Comment} from '../../shared/models/Social'
import { DatePipe } from '@angular/common';
import { Router } from '@angular/router';
import { TorrentService } from '../../shared/services/torrent.service';
import { UserService } from '../../shared/services/user.service';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';

@Component({
  selector: 'app-browser',
  templateUrl: './browser.component.html',
  styleUrls: ['./browser.component.scss']
})
export class BrowserComponent implements OnInit, AfterViewInit{
  //TODO: Datasource, paginator, szűrés?
  
  columnNames : string[] = ['date_added', 'uploaderId', 'category', 'name', 'seeders', 'leechers'];
  dataSource = new MatTableDataSource<Torrent>();
  @ViewChild(MatSort, { static: true }) sort!: MatSort;
  @ViewChild(MatPaginator, { static: true }) paginator!: MatPaginator;
  usernames: { [id: string]: string } = {};


  constructor(private router : Router, private torrentService : TorrentService, private userService: UserService) { }



  ngOnInit(): void {
    this.userService.getAll().subscribe((data) => {
      data.forEach(user => {
        this.usernames[user.id] = user.username
      })
    })
    
  }

  ngAfterViewInit(): void {
    this.torrentService.getAll().subscribe((data) => {
      this.dataSource.data = data;
      this.dataSource.sort = this.sort;
      this.dataSource.paginator = this.paginator;
    })
  }



  onRowClicked(row:any){
    this.router.navigate(['/torrent', row.id]);
  }


}
