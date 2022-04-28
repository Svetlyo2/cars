import {Component, OnDestroy, OnInit} from '@angular/core';
import {AdService} from '../../../core/services/ad.service';
import {Router} from '@angular/router';
import {combineLatest, Observable} from 'rxjs';
import {switchMap} from 'rxjs/operators';

@Component({
  selector: 'app-my-watchlist',
  templateUrl: './my-watchlist.component.html',
  styleUrls: ['./my-watchlist.component.css']
})
export class MyWatchlistComponent implements OnInit, OnDestroy {

  // watchlist: string[];
  ads = [];
  haveAds = true;
  ads$: Observable<any>;

  constructor(private adService: AdService, private router: Router) {
  }

  ngOnDestroy(): void {
    }

  ngOnInit(): void {
    this.adService.getNewWatchlist()
      .pipe(switchMap(x => {
        // console.log('onInit: ', x);
        if (x.length === 0) {
          this.haveAds = false;
          this.ads = [];
        }
        const ads$ = combineLatest(x.map(e => this.adService.getAd(e['adId'])));
        return ads$;
        }), switchMap(arr => {
          // console.log('from watchlist', arr);
          arr.forEach(e => e['isWatched'] = true);
          return [arr];
        })
      ).subscribe((data) => {
      this.ads = data;
    });
  }
  changeWatch(adId): void {
    this.adService.isWatched(adId)
      .subscribe(( a => {
        if (a.size > 0) {
          console.log('delete doc: ', a.docs[0].id);
          this.adService.removeFromWatchlist(a.docs[0].id);
        }
        // NO NEED TO ADD FROM WL TO WL
      }));
  }
}
