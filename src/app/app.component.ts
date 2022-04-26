import { Component, OnInit } from '@angular/core';
import { MatSidenav } from '@angular/material/sidenav';
import { NavigationEnd, NavigationStart, Router } from '@angular/router';
import { filter } from 'rxjs';
import { AuthService } from './shared/services/auth.service';
import { MessageService } from './shared/services/message.service';
import { UserService } from './shared/services/user.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  page = '';
  routes: Array<string> = [];
  currentMessage : any;
  currentUser? : firebase.default.User | null;

  constructor(private router: Router, private msgService: MessageService, private authService : AuthService) {
    //this.message.currentMessage.subscribe(msg => this.message = msg);
    msgService.currentMessage.subscribe(message => this.currentMessage = message);
  }

  ngOnInit() {
    this.routes = this.router.config.map(conf => conf.path) as string[];

    this.router.events.pipe(filter(event => event instanceof NavigationEnd)).subscribe((evts: any) => {
      const currentPage = (evts.urlAfterRedirects as string).split('/')[1] as string;
      if (this.routes.includes(currentPage)) {
        this.page = currentPage;
      }
    });

    this.authService.isUserLoggedIn().subscribe(user => {
      this.currentUser = user;
      localStorage.setItem('user', JSON.stringify(this.currentUser))
    }, error => {
      this.msgService.changeMessage('error', 'Error while getting current user! :(', 'Click to dismiss...')
      localStorage.setItem('user', JSON.stringify('null'))
    })


  }

  logout(_?: boolean){
    this.authService.logout().then(() => {
      this.msgService.changeMessage('success', 'Logged out succesfully!', 'Click to dismiss...')
      console.log('LOGGED OUT SUCCESFULLY!')   
    }).catch(error => {
      this.msgService.changeMessage('error', 'Error while logging out! :(', 'Click to dismiss...')
    })
  }

  changePage(selectedPage: string) {
    this.router.navigateByUrl(selectedPage);
  }

  onToggleSidenav(sidenav: MatSidenav) {
    sidenav.toggle();
  }

  onClose(event: any, sidenav: MatSidenav) {
    if (event === true) {
      sidenav.close();
    }
  }
}