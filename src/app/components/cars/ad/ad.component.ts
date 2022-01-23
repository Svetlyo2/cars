import {Component, Input, OnInit} from '@angular/core';
import {ListAd} from '../../../core/models/list-ad';
import {AuthService} from '../../../core/services/auth.service';

@Component({
  selector: 'app-ad',
  templateUrl: './ad.component.html',
  styleUrls: ['./ad.component.css']
})
export class AdComponent implements OnInit {
  @Input() ad: ListAd;
  userId: string;

  constructor(private authService: AuthService) { }

  ngOnInit(): void {
    this.userId =  this.authService.getCurrentUserId();
  }

}
