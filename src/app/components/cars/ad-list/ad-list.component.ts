import { Component, OnInit } from '@angular/core';
import {AdService} from '../../../core/services/ad.service';
import {ListAd} from '../../../core/models/list-ad';
import {ActivatedRoute} from '@angular/router';
import {combineLatest, Observable} from 'rxjs';
import {map, tap} from 'rxjs/operators';

@Component({
  selector: 'app-ad-list',
  templateUrl: './ad-list.component.html',
  styleUrls: ['./ad-list.component.css']
})
export class AdListComponent implements OnInit {
  // ads: ListAd[];
  // watchlistIds: string[] = [];
  watchlist$: Observable<any>;
  ads$: Observable<ListAd[]>;
  all$: Observable<{watchlist: string[], adsList: ListAd[]}>;
  constructor(private adService: AdService, private activatedRoute: ActivatedRoute) { }

  ngOnInit(): void {
    this.watchlist$ = this.adService.getNewWatchlist();
    this.ads$ = this.adService.getAllAds();
    this.all$ = combineLatest([this.watchlist$, this.ads$])
      .pipe(
        map(([watchlist, adsList]) => {
          if (watchlist) {
            watchlist = watchlist.map( x => x['adId']);
            // watchlist.forEach(x => this.watchlistIds.push(x['adId']));
          }
          adsList.map(e => {
            if (watchlist.includes(e.id)){
            // if (this.watchlistIds.includes(e.id)){
              e.isWatched = true;
            } else {
              e.isWatched = false;
            }
          });
          return {watchlist, adsList};
        })
      );
  }

  // getAds(){
  //   this.adService.getAllAds2();
  //   this.adService.allAdsChanged
  //     .subscribe((res) => {
  //     this.ads = res;
  //     this.ads.forEach((e) => {
  //       if (this.watchlistIds) {
  //         if (this.watchlistIds.includes(e.id)){
  //           e.isWatched = true;
  //         } else {
  //           e.isWatched = false;
  //         }
  //       }
  //     });
  //   });
  // }
}
