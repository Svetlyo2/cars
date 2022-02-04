import {Component, OnInit} from '@angular/core';
import {AdService} from '../../../core/services/ad.service';
import {AuthService} from '../../../core/services/auth.service';
import {ListAd} from '../../../core/models/list-ad';

@Component({
  selector: 'app-my-watchlist',
  templateUrl: './my-watchlist.component.html',
  styleUrls: ['./my-watchlist.component.css']
})
export class MyWatchlistComponent implements OnInit {

  watchlist: string[];
  ads: ListAd[] = [];

  constructor(private adService: AdService, private authService: AuthService) {
  }

  ngOnInit(): void {
    this.getAds();
    // this.getAds2();
  }

  getWatchlist(ownerId: string) {
    this.adService.getWatchlistIds(ownerId);
    this.adService.watchlistChanged.subscribe((res) => {
      this.watchlist = res;
      console.log(this.watchlist);
    });
  }

  getAds(){
    this.adService.getAllAds();
    this.adService.allAdsChanged.subscribe((e) => {
      this.ads = e.filter((x) => x.isWatched === true);
    });
  }

  // getAds2(){
  //   this.adService.getWatchlistIds(localStorage.getItem('userId'));
  //   this.adService.getWatchedAds();
  // }
}
