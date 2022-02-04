import {Component, Input, OnInit} from '@angular/core';
import {ListAd} from '../../../core/models/list-ad';
import {AuthService} from '../../../core/services/auth.service';
import {AdService} from '../../../core/services/ad.service';

@Component({
  selector: 'app-ad',
  templateUrl: './ad.component.html',
  styleUrls: ['./ad.component.css']
})
export class AdComponent implements OnInit {
  @Input() ad: ListAd;
  userId: string;

  constructor(private authService: AuthService, private adServise: AdService) { }

  ngOnInit(): void {
    this.userId =  this.authService.getCurrentUserId();
  }
  watch(){
  this.adServise.watch(this.ad.id);
  this.ad.isWatched = true;
  }
  watchNot(){
    this.adServise.watchNot(this.ad.id);
    this.ad.isWatched = false;
  }
}
