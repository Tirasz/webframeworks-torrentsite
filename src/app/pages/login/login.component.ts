import { Location } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { AuthService, ErroAuthEn } from '../../shared/services/auth.service';
import { Router } from '@angular/router';
import {ValidationErrors, ValidatorFn, Validators} from '@angular/forms';
import { MessageService } from '../../shared/services/message.service';
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  loading: boolean = false;

  loginForm = new FormGroup({
    email: new FormControl('', Validators.email),
    password: new FormControl('', Validators.minLength(6))
  })

  constructor(private location: Location, private authService: AuthService, private router: Router, private msgService: MessageService) { }

  ngOnInit(): void {
  }

  async login(){
    this.loading = true;
    this.authService.login(this.loginForm.get('email')?.value, this.loginForm.get('password')?.value).then(cred => {
      console.log('Logged in succesfully!');
      this.router.navigateByUrl('/browser')
      this.loading = false;
      this.msgService.changeMessage('success', 'Login was succesful', 'Click to dismiss...')
    }).catch(error => {
      console.log(error);
      this.loading = false;
      this.msgService.changeMessage('error',ErroAuthEn.convertMessage(error['code']) , 'Click to dismiss...')
    })
  }

  goBack() {
    this.location.back();
  }

}