import { Injectable } from '@angular/core';
import { Observable, of, BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class MessageService {

  private messageSource = new BehaviorSubject<any>({
    type : '',
    title : '',
    subTitle : '',
    show : false
  })

  currentMessage = this.messageSource.asObservable();

  constructor() { }

  clearMessage(type : string, title : string, subTitle : string){
    this.messageSource.next({
      type: type,
      title: title,
      subTitle : subTitle,
      show : false
    })
  }

  changeMessage(type : string, title : string, subTitle : string){
    this.messageSource.next({
      type: type,
      title: title,
      subTitle : subTitle,
      show : true
    })
  }


}

/* 

setTimeout(() => {
      if(this.currentTitle == title){
        this.messageSource.next({
          type: '',
          title: '',
          subTitle : ''
        })
    }
    }, 10000);

*/