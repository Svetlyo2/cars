import {Component, OnInit, Output} from '@angular/core';
import {AdService} from '../../../core/services/ad.service';
import {ListAd} from '../../../core/models/list-ad';
import {combineLatest, Observable} from 'rxjs';
import {map} from 'rxjs/operators';

@Component({
  selector: 'app-ad-list',
  templateUrl: './ad-list.component.html',
  styleUrls: ['./ad-list.component.css']
})
export class AdListComponent implements OnInit {
  watchlist$: Observable<any>;
  ads$: Observable<ListAd[]>;
  all$: Observable<{watchlist: string[], adsList: ListAd[]}>;
  private notFiltered: ListAd[];
  isFiltered = false;
  searchResults: boolean;
  haveAds = true;
  @Output() searchValue = '';
  constructor(private adService: AdService) { }

  ngOnInit(): void {
    this.watchlist$ = this.adService.getNewWatchlist();
    this.ads$ = this.adService.getAllAds();
    this.combineLists();
  }

  combineLists(): void {
    this.all$ = combineLatest([this.watchlist$, this.ads$])
      .pipe(
        map(([watchlist, adsList]) => {
          if (watchlist) {
            watchlist = watchlist.map( x => x['adId']);
          }
          adsList.map(e => {
            if (!e){
              this.haveAds = false;
            }
            if (watchlist.includes(e.id)){
              e.isWatched = true;
            } else {
              e.isWatched = false;
            }
          }).sort((a, b ) => b['createdOn']['seconds'] - a['createdOn']['seconds']);
          // console.log(adsList.sort((a,b ) => b['price'] - a['price']));
          this.notFiltered = adsList.sort((a, b ) => b['createdOn']['seconds'] - a['createdOn']['seconds']);
          return {watchlist, adsList};
        })
      );
  }

  search(searchText: string): void {
    const input = searchText.toUpperCase().split(' ', 2);
    this.isFiltered = true;
    if (input.length === 1) {
      const filtered = this.notFiltered.filter((a) => a.make === input[0]);
      if (filtered.length === 0) {
        this.searchResults = false;
      }
      this.all$ = this.watchlist$.pipe(map(w => {
        return {watchlist: w, adsList: filtered };
      }));
      // this.ads$ = this.adService.getByMake(input[0].toUpperCase());
      // this.combineLists();
    } else if (input.length === 2) {
      console.log(input);
      const filtered = this.notFiltered
        .filter((a) => a.make === input[0] && a.model === input[1]);
      if (filtered.length > 0) {
        this.searchResults = true;
      }
      this.all$ = this.watchlist$.pipe(map(w => {
        return {watchlist: w, adsList: filtered };
      }));
      // this.ads$ = this.adService.getByMakeAndModel(input[0], input[1]);
      // this.combineLists();
    }
  }
  showAll(): void {
    this.isFiltered = false;
    this.all$ = this.watchlist$.pipe(map(w => {
      return {watchlist: w, adsList: this.notFiltered };
    }));
    this.searchValue = null;
  }
  changeWatch(adId): void {
    this.adService.isWatched(adId)
      .subscribe(( a => {
      if (a.size > 0) {
        console.log('delete doc: ', a.docs[0].id);
        this.adService.removeFromWatchlist(a.docs[0].id);
      } else {
        console.log('add: ', adId);
        this.adService.adToWatchlist(adId);
      }
    }));
  }
}
