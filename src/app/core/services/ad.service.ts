import {Injectable} from '@angular/core';
import {AngularFirestore, AngularFirestoreCollection, CollectionReference} from '@angular/fire/firestore';
import {Observable, Subject, Subscription} from 'rxjs';
import {Ad} from '../models/ad';
import {ListAd} from '../models/list-ad';
import {CreateAd} from '../models/create-ad';
import {concatMap, map, switchMap, tap} from 'rxjs/operators';
import {AuthService} from './auth.service';
import {Router} from '@angular/router';
import {ToastrService} from 'ngx-toastr';

const useId: string = localStorage.getItem('userId');
@Injectable({
  providedIn: 'root'
})
export class AdService {
  // private _ad: Ad;
  // private adCollection: CollectionReference<ListAd>;
  // private _watchlist: string[];
  // private _watchlist: string[] = [];
  // private _allAds: ListAd[] = [];
  private _myAds: ListAd[] = [];
  myAdsChanged = new Subject<ListAd[]>();
  // private _watchedAds: ListAd[] = [];
  // allAdsChanged = new Subject<ListAd[]>();
  // watchlistChanged = new Subject<string[]>();
  // watchedAdsChanged = new Subject<ListAd[]>();

  constructor(private afDb: AngularFirestore,
              // private authService: AuthService,
              private router: Router,
              private toastr: ToastrService) {
    // this.adCollection = afDb.collection<ListAd>('cars').ref;
  }

  createAd(data: CreateAd): void {
    this.afDb.collection<CreateAd>('cars').add(data)
      .then((docRef) => {
        this.toastr.success('Your add was published!');
        // return docRef.id; TO CHECK
      })
      .catch((err) => {
        console.log(err);
        this.toastr.error('Something went wrong while publishing the ad!');
      });
  }

  // getAllAds2() {
  //   this.afDb.collection<ListAd>('cars')
  //     .valueChanges({idField: 'id'})
  //     .subscribe((res) => {
  //       this._allAds = res;
  //       this.allAdsChanged.next([...this._allAds]);
  //     });
  // }
  // this.afDb.collection<Ad>('cars')
  //   .snapshotChanges()
  //   .subscribe((data) => {
  //     this._ads = data;
  //     console.log(data);
  //   });
  getAllAds(): Observable<ListAd[]> {
    return this.afDb.collection<ListAd>('cars')
      .valueChanges({idField: 'id'});
  }

  getMyAds(): void{
    // let docRef = this.afDb.collection<ListAd>('cars', (ref) => ref.where('ownerId', '==', ownerId))
    this.afDb.collection<ListAd>('cars', (ref) => ref.where('ownerId', '==', useId))
      .valueChanges({idField: 'id'})
      .subscribe((res) => {
        this._myAds = res;
        this.myAdsChanged.next([...this._myAds]);
      });
  }

  // getWatchlistIds() {
  //   this._watchlist = [];
  //   this.afDb.collection('watchlist', (ref) => ref.where('userId', '==', useId))
  //   .valueChanges()
  //     .subscribe((res) => {
  //       res.forEach((x) => {
  //        this._watchlist.push(x['adId']);
  //       });
  //       this.watchlistChanged.next([...this._watchlist]);
  //     });
  // }

  getNewWatchlist(): Observable<any> {
    return this.afDb.collection('watchlist',
      (ref) => ref.where('userId', '==', useId))
      .valueChanges({idField: 'id'});
  }

  getAd(docId: string): Observable<any> {
    const adsDocs = this.afDb.doc<Ad>('cars/' + docId);
    return adsDocs.valueChanges({idField: 'id'});
    //   .snapshotChanges().pipe(
    //   map(changes => {
    //     const data = changes.payload.data();
    //     const id = changes.payload.id;
    //     return {id, ...data};
    //   })
    // );
  }

  deleteAdById(id: string) {
    this.afDb.collection<ListAd>('cars').doc(id).delete()
      .then(() => {
        this.router.navigate(['cars/my']);
        this.toastr.success('Ad deleted!');
      });
  }

  editAd(ad: any, adId: string) {
    return this.afDb.collection<ListAd>('cars').doc(adId).update(ad);
  }
  isWatched(adId: string): Observable<any>{
    return this.afDb.collection('watchlist',
      (ref => ref.where('adId', '==', adId).where('userId', '==', useId))).get();
  }

  changeWatch(adId: string){
    this.isWatched(adId)
      .pipe(
      map(r => {
        if (r.size > 0) {
        return r.docs[0].id;
        }
      })
    )
      .subscribe(docId => {
        if (docId !== undefined) {
        this.afDb.collection('watchlist').doc(docId).delete()
            .then((a) => {
              this.toastr.success('The car was removed from watchlist');
            })
            .catch(err => {
              console.log(err);
              this.toastr.error('Something went wrong while removing from watchlist!');
            });
        } else {
          const record = {adId, userId: useId};
          this.afDb.collection('watchlist').add(record)
            .then((docRef) => {
              this.toastr.success('Car added to watchlist');
              // return docRef.id;
            })
            .catch((err) => {
              console.log(err);
              this.toastr.error('Something went wrong while adding to watchlist!');
            });
        }
      });
  }
}
