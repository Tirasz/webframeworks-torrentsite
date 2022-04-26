import { Injectable } from '@angular/core';
import {AngularFireAuth} from '@angular/fire/compat/auth';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private auth: AngularFireAuth) { }

  login(email: string, pw: string){
    return this.auth.signInWithEmailAndPassword(email, pw);
  }

  register(email : string, pw: string){
    return this.auth.createUserWithEmailAndPassword(email, pw);
  }

  logout(){
    return this.auth.signOut();
  }
  
  isUserLoggedIn(){
    return this.auth.user;
  }
}


export namespace ErroAuthEn {
        export function convertMessage(code: string): string {
            switch (code) {
                case 'auth/user-disabled': {
                    return 'Your user is disabled.';
                }
                case 'auth/user-not-found': {
                    return 'User not found.';
                }
                case 'auth/wrong-password': {
                  return 'Incorrect password entered. Please try again.';
                }
                case 'auth/email-already-in-use':{
                  return 'This e-mail is already in use!'
                }
                case 'auth/invalid-email':{
                  return 'The e-mail address is not valid!'
                }
                case 'auth/weak-password':{
                  return 'The password is not strong enough!'
                }
                default: {
                    return 'Error, try again later.';
                }
            }
        }
 }