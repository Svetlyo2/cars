import {Component, OnInit} from '@angular/core';
import {AdService} from '../../../core/services/ad.service';

@Component({
  selector: 'app-my-ads',
  templateUrl: './my-ads.component.html',
  styleUrls: ['./my-ads.component.css']
})
export class MyAdsComponent implements OnInit {

  ads;

  constructor(private adService: AdService) {
  }

  ngOnInit(): void {
    this.getMyAds();
  }

  getMyAds(): void {
    this.adService.getMyAds();
    this.adService.myAdsChanged
      .subscribe((res) => {
        this.ads = res;
      });
  }
}
