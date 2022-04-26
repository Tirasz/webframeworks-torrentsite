import { Component, OnInit, Input, OnChanges, SimpleChanges, SimpleChange } from '@angular/core';
import { stringify } from 'querystring';
import {
  trigger,
  state,
  style,
  animate,
  transition,
} from '@angular/animations';
import { MessageService } from '../services/message.service';



@Component({
  selector: 'app-message',
  templateUrl: './message.component.html',
  styleUrls: ['./message.component.scss'],
  animations: [
    trigger('openClose', [
      // ...
      state('open', style({
        opacity: 1,
        top: 20 
      })),
      state('closed', style({
        opacity: 0,
        top: -20
      })),
      transition('open => closed', [
        animate('0.25s')
      ]),
      transition('closed => open', [
        animate('0.25s')
      ]),
    ]),
  ]
})
export class MessageComponent implements OnInit{

  @Input() type : string = ''
  @Input() title : string = ''
  @Input() subTitle : string = ''
  @Input() show : boolean = false;
  
  constructor(private msgService : MessageService) { 
  }

  mouseEnter(){
    this.msgService.clearMessage(this.type, this.title, this.subTitle);
  }

  ngOnInit(): void {
  }


}
