import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthService } from './auth.service';
import { MessageService } from './message.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {
  constructor(private authService : AuthService, private msgService : MessageService, private router: Router){}

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
      const user = JSON.parse(localStorage.getItem('user') as string)
      if (user) {
        return true
      }
      this.msgService.changeMessage('warning', 'You dont have the right!', 'Log in to visit this page.')
      return this.router.createUrlTree(['/login'])
  }
  
}
