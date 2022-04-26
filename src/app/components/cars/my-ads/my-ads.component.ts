import {Component, OnDestroy, OnInit} from '@angular/core';
import {AdService} from '../../../core/services/ad.service';
import {Subscription} from 'rxjs';

@Component({
  selector: 'app-my-ads',
  templateUrl: './my-ads.component.html',
  styleUrls: ['./my-ads.component.css']
})
export class MyAdsComponent implements OnInit, OnDestroy {

  ads = [];
  myAdsSub: Subscription;
  haveAds = true;

  constructor(private adService: AdService) {
  }

  ngOnInit(): void {
    this.getMyAds();
  }

  ngOnDestroy(): void {
    this.myAdsSub.unsubscribe();
  }

  getMyAds(): void {
    this.adService.getMyAds();
    this.myAdsSub = this.adService.myAdsChanged
      .subscribe((res) => {
        this.ads = res;
        if (res.length === 0) {
          this.haveAds = false;
        }
      });
  }
}
