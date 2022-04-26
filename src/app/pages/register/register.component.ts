import { Location } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, AbstractControl } from '@angular/forms';
import { MessageService } from '../../shared/services/message.service';
import { AuthService, ErroAuthEn } from '../../shared/services/auth.service';
import {ValidationErrors, ValidatorFn, Validators} from '@angular/forms';
import { Router } from '@angular/router';
import { User } from '../../shared/models/Social';
import { UserService } from '../../shared/services/user.service';

export function matchValues(matchTo: string): ValidatorFn {
  return (control: AbstractControl): ValidationErrors | null => {
    return !!control.parent &&
      !!control.parent.value &&
      control.value === control.parent.get(matchTo)?.value
      ? null
      : { isMatching: false };
  };
}

@Component({
  selector: 'app-signup',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {

  registerForm = new FormGroup({
    username: new FormControl('', [Validators.minLength(3), Validators.maxLength(10), Validators.required]),
    email: new FormControl('', [Validators.email, Validators.required]),
    password: new FormControl('', [Validators.minLength(6), Validators.required]),
    rePassword: new FormControl('', [Validators.minLength(6), Validators.required, matchValues('password')])
  });

  loading: boolean = false;

  constructor(private location: Location, private authService : AuthService, private msgService : MessageService, private router : Router, private userService : UserService) { }

  ngOnInit(): void {
  }


  async onSubmit() {
    this.loading = true;

    this.authService.register(this.registerForm.get('email')?.value, this.registerForm.get('password')?.value).then((cred) => {
      const user : User = {
        id: cred.user?.uid as string,
        email: this.registerForm.get('email')?.value,
        date_added: new Date(),
        username: this.registerForm.get('username')?.value
      }
      
      this.userService.create(user).then(() => {
        this.msgService.changeMessage('success', 'Registration was successful!', 'Welcome, ' + this.registerForm.get('username')?.value + '!' + '\n Click to dismiss...');
        this.router.navigateByUrl('/browser')
      })
      
    }).catch(error => {
      console.log(error);
      this.msgService.changeMessage('error',ErroAuthEn.convertMessage(error['code']) , 'Click to dismiss...')
      
    }).finally(() =>{
      this.loading = false;
    })
  }

  goBack() {
    this.location.back();
  }

}