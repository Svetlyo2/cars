import { Component, OnInit } from '@angular/core';
import {AdService} from '../../../core/services/ad.service';
import {ListAd} from '../../../core/models/list-ad';

@Component({
  selector: 'app-ad-list',
  templateUrl: './ad-list.component.html',
  styleUrls: ['./ad-list.component.css']
})
export class AdListComponent implements OnInit {
  ads: ListAd[];
  watchlistIds: string[];
  constructor(private adService: AdService) { }

  ngOnInit(): void {
    this.adService.getWatchlistIds(localStorage.getItem('userId'));
    this.adService.watchlistChanged.subscribe((res) => {
    this.watchlistIds = res;
    });
    this.getAds();
  }
  getAds(){
    this.adService.getAllAds();
    this.adService.allAdsChanged
      .subscribe((res) => {
      this.ads = res;
      this.ads.forEach((e) => {
        if (this.watchlistIds) {
          if (this.watchlistIds.includes(e.id)){
            e.isWatched = true;
          } else {
            e.isWatched = false;
          }
        }
      });
      // console.log(this.ads);
      //   console.log(this.watchlistIds);
      // console.log(res[0].payload.doc.data());
    });
  }
}
