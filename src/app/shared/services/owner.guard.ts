import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, RouterStateSnapshot, UrlTree, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { TorrentService } from './torrent.service';
import { Torrent } from '../models/Torrent';
import { MessageService } from './message.service';



@Injectable({
  providedIn: 'root'
})
export class OwnerGuard implements CanActivate {
  constructor(private torrentService : TorrentService, private router: Router, private msgService:MessageService){}

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
      let torrent = route.paramMap.get('id')!;
      let user = JSON.parse(localStorage.getItem('user') as string)
      if(!user){
        return false
      }
      
      let promise : Promise<boolean | UrlTree> = new Promise((resolve, reject) =>{
        this.torrentService.getById(torrent).subscribe(torrent=>{
          if (user.uid != torrent.uploaderId){
            return resolve(this.router.createUrlTree(['/browser']))
          }
          return resolve(true)
        })
      })

      return promise;
  }
  


}
