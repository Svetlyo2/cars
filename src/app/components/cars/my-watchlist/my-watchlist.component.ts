import {Component, OnDestroy, OnInit} from '@angular/core';
import {AdService} from '../../../core/services/ad.service';
import {ListAd} from '../../../core/models/list-ad';
import {ActivatedRoute, Router} from '@angular/router';
import {combineLatest, Observable} from 'rxjs';
import {map, switchMap} from 'rxjs/operators';

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
        // this.ads = [];
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
    // this.ads$ = this.adService.getNewWatchlist()
    //   .pipe(switchMap(x => {
    //       const ads$ = combineLatest(x.map(e => this.adService.getAd(e['adId'])));
    //       return ads$;
    //     }), switchMap(arr => {
    //       if (arr) {
    //         this.haveAds = false;
    //       }
    //       arr.forEach(e => e['isWatched'] = true);
    //       return [arr];
    //     })
    //   );

    // this.ads$ = this.adService.getNewWatchlist()
    //   .pipe(switchMap(x => {
    //     const ads$ = combineLatest(x.map(e => this.adService.getAd(e['adId'])));
    //     return ads$;
    //   }));

    // .forEach(x => this.watchlist.push(x['adId']))
    // .pipe(this.watchlist.forEach(id => console.log(id)));
    // return combineLatest([of(this.watchlist),
    //   combineLatest([this.watchlist.map(id => {
    //     this.adService.getAd(id).pipe(map(ad => {
    //       this.ads.push(ad);
    //       console.log(ad);
    //     }));
    //   })])
    // ]);
    //   return
    // }));
    // this.activatedRoute.data.subscribe(
    //   data => {
    //     data.watchList.forEach((x) => {
    //       this.watchlist.push(x['adId']);
    //     });
    //   }
    // );
    // this.getAds2();
  }
  changeWatch(adId): void {
    this.adService.isWatched(adId)
      .subscribe(( a => {
        if (a.size > 0) {
          console.log('delete doc: ', a.docs[0].id);
          this.adService.removeFromWatchlist(a.docs[0].id);
        }
        // CAN NOT ADD FROM WL
        // else {
        //   console.log('add: ', adId);
        //   this.adService.adToWatchlist(adId);
        // }
      }));
  }


  // getAds(){
  //   this.adService.getAllAds();
  //   this.adService.allAdsChanged.subscribe((e) => {
  //     this.ads = e.filter((x) => x.isWatched === true);
  //   });
  // }

  // getAds2() {
  //   this.ads = [];
  //   // console.log(this.ads);
  //   this.watchlist
  //     .forEach(id => this.adService.getAd(id).subscribe(res => {
  //       console.log(res.id);
  //       if (this.ads.filter(a => a.id === res.id)){
  //         this.ads.push(res);
  //       }
  //       console.log(this.ads);
  //     }));
  // }
}
