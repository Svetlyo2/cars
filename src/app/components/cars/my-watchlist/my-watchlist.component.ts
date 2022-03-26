import {Component, OnInit} from '@angular/core';
import {AdService} from '../../../core/services/ad.service';
import {ListAd} from '../../../core/models/list-ad';
import {ActivatedRoute} from '@angular/router';
import {combineLatest, Observable} from 'rxjs';
import {switchMap} from 'rxjs/operators';

@Component({
  selector: 'app-my-watchlist',
  templateUrl: './my-watchlist.component.html',
  styleUrls: ['./my-watchlist.component.css']
})
export class MyWatchlistComponent implements OnInit {

  // watchlist: string[];
  // ads: ListAd[] = [];
  ads$: Observable<any>;

  constructor(private adService: AdService, private activatedRoute: ActivatedRoute) {
  }

  ngOnInit(): void {
    // this.getAds();
    // this.ads = [];
    // this.watchlist = [];

    this.ads$ = this.adService.getNewWatchlist()
      .pipe(switchMap(x => {
        const ads$ = combineLatest(x.map(e => this.adService.getAd(e['adId'])));
        return ads$;
      }), switchMap(arr => {
        arr.forEach(e => e['isWatched'] = true);
        return [arr];
        })
        );


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
