import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AngularFireAuth } from 'angularfire2/auth';
import firebase from 'firebase/app';
/*
  Generated class for the AuthProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class AuthProvider {

  constructor(public afAuth: AngularFireAuth) {
    console.log('Hello AuthProvider Provider');
  }

  loginUser(newEmail: string, newPassword: string): Promise<any> 
  {
  return this.afAuth.auth.signInWithEmailAndPassword(newEmail, newPassword);

	}

	resetPassword(email: string): Promise<void> {
  return this.afAuth.auth.sendPasswordResetEmail(email);
}

	
	logoutUser(): Promise<void> {
  return this.afAuth.auth.signOut();
}

	signupUser(newEmail: string, newPassword: string): Promise<any> {
  return this.afAuth.auth.createUserWithEmailAndPassword(newEmail, newPassword);
}


}
