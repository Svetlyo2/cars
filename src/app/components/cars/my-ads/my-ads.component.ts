import {Component, OnInit} from '@angular/core';
import {AdService} from '../../../core/services/ad.service';
import {AuthService} from '../../../core/services/auth.service';

@Component({
  selector: 'app-my-ads',
  templateUrl: './my-ads.component.html',
  styleUrls: ['./my-ads.component.css']
})
export class MyAdsComponent implements OnInit {

  ads;

  constructor(private adService: AdService, private authService: AuthService) {
  }

  ngOnInit(): void {
    this.getMyAds(this.authService.getCurrentUserId());
  }

  getMyAds(ownerId: string) {
    this.adService.getMyAds(ownerId);
    this.adService.myAdsChanged
      .subscribe((res) => {
        this.ads = res;
      });
  }
}
