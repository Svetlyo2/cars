import { Component, OnInit } from '@angular/core';
import {AuthService} from '../../../core/services/auth.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  isAuth: boolean;

  constructor(private authService: AuthService) { }

  ngOnInit(): void {
    this.authService.isAuthChanged.subscribe((data) => {
      this.isAuth = data;
    });
  }
  logout(){
    this.authService.logout();
  }

}
