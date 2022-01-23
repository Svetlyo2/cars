import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {Router} from '@angular/router';
import {AuthService} from '../../../core/services/auth.service';
import {AngularFirestore} from '@angular/fire/firestore';
import { ToastrService } from 'ngx-toastr';
import {AngularFireAuth} from '@angular/fire/auth';
import {User} from '../../../core/models/user';

@Component({
  selector: 'app-signin',
  templateUrl: './signin.component.html',
  styleUrls: ['./signin.component.css']
})
export class SigninComponent implements OnInit {
  signinForm: FormGroup;
  userData: User;

  constructor(
    private afDb: AngularFirestore,
    private afAuth: AngularFireAuth,
    private fb: FormBuilder,
    private authService: AuthService,
    private router: Router,
    private toastr: ToastrService,
  ) {
    this.afAuth.authState.subscribe(user => {
      if (user){
        this.userData = user;
        localStorage.setItem('user', JSON.stringify(this.userData));
        JSON.parse(localStorage.getItem('user'));
      } else {
        localStorage.setItem('user', null);
        JSON.parse(localStorage.getItem('user'));
      }
    });
  }

  ngOnInit(): void {
    this.signinForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]]
    });
  }
  signin(){
  const {email, password} = this.signinForm.value;
  this.authService.signin(email, password);
  }

  signOut() {
    return this.afAuth.signOut().then(() => {
      localStorage.removeItem('user');
      this.router.navigate(['/']);
      this.toastr.info('Logged out!');
    });
  }

  get getUserId() {
    let user = JSON.parse(localStorage.getItem('user'));
    return user.uid;
  }

}
