import { Injectable } from '@angular/core';
import {AngularFireAuth} from '@angular/fire/auth';
import {Router} from '@angular/router';
import {Subject} from 'rxjs';
import {ToastrService} from 'ngx-toastr';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private _isAuth = false;
  private _userId = null;
  isAuthChanged = new Subject<boolean>();

  constructor(
    private afAuth: AngularFireAuth,
    private router: Router,
    private toastr: ToastrService,
  ) { }

  initializeAuthState(){
    this.afAuth.authState.subscribe((userData) => {
      if (userData){
        this._isAuth = true;
        this._userId = userData.uid;
        localStorage.setItem('userId', this._userId);
        this.isAuthChanged.next(true);
      } else {
        this._isAuth = false;
        localStorage.setItem('userId', null);
        this.isAuthChanged.next(false);
      }
    });
  }
  getCurrentUserId(): string {
    return this._isAuth ? this._userId : null;
  }

  signUp(email: string, password: string) {
    this.afAuth.createUserWithEmailAndPassword(email, password)
      .then((data) => {
        this.toastr.success('Sign up successful!');
        this.router.navigate(['/cars/list']);
      })
      .catch((err) => {
        // console.error(err);
        this.toastr.error(err.message);
      });
  }
  signin(email: string, password: string) {
    this.afAuth.signInWithEmailAndPassword(email, password)
      .then((data) => {
        this.router.navigate(['/cars/list']);
        this.toastr.success('Login Successful!');
      })
      .catch((err) => {
        // console.error(err);
        this.toastr.error(err.message);
      });
  }
  logout(): void{
    this.afAuth.signOut()
      .then(r => {
        this.toastr.info('Logged out!');
        // When using AuthGuard keeping the local storage allows page load
        // before receiving response from Firebase!
        localStorage.clear();
        this.router.navigate(['/']);
      });
  }
  isAuthenticated(): string{
    return localStorage.getItem('userId');
  }
}
