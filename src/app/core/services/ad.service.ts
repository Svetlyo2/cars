import {Injectable} from '@angular/core';
import {AngularFirestore, AngularFirestoreCollection, CollectionReference} from '@angular/fire/firestore';
import {Observable, Subject, Subscription} from 'rxjs';
import {Ad} from '../models/ad';
import {ListAd} from '../models/list-ad';
import {CreateAd} from '../models/create-ad';
import {map} from 'rxjs/operators';
import {AuthService} from './auth.service';
import {Router} from '@angular/router';
import firebase from 'firebase';

const useId: string = localStorage.getItem('userId');
@Injectable({
  providedIn: 'root'
})
export class AdService {
  private _ad: Ad;
  // private adCollection: CollectionReference<ListAd>;
  // private _watchlist: string[];
  private _watchlist: string[];
  private _allAds: ListAd[] = [];
  private _myAds: ListAd[] = [];
  private _watchedAds: ListAd[] = [];
  allAdsChanged = new Subject<ListAd[]>();
  myAdsChanged = new Subject<ListAd[]>();
  watchlistChanged = new Subject<string[]>();
  watchedAdsChanged = new Subject<ListAd[]>();

  constructor(private afDb: AngularFirestore, private authService: AuthService, private router: Router) {
    // this.adCollection = afDb.collection<ListAd>('cars').ref;
  }

  createAd(data: CreateAd) {
    this.afDb.collection<CreateAd>('cars').add(data)
      .then((docRef) => {
        // console.log('Document written with ID: ', docRef.id);
        return docRef.id;
      })
      .catch((err) => {
        console.log(err);
      });
  }

  getAllAds() {
    this.afDb.collection<ListAd>('cars')
      .valueChanges({idField: 'id'})
      .subscribe((res) => {
        this._allAds = res;
        this.allAdsChanged.next([...this._allAds]);
        // console.log(res);
      });
  }
  // this.afDb.collection<Ad>('cars')
  //   .snapshotChanges()
  //   .subscribe((data) => {
  //     this._ads = data;
  //     console.log(data);
  //   });

  getMyAds(ownerId: string){
    // let docRef = this.afDb.collection<ListAd>('cars', (ref) => ref.where('ownerId', '==', ownerId))
    this.afDb.collection<ListAd>('cars', (ref) => ref.where('ownerId', '==', ownerId))
      .valueChanges({idField: 'id'})
      .subscribe((res) => {
        this._myAds = res;
        this.myAdsChanged.next([...this._myAds]);
      });
      // .snapshotChanges()
      // .pipe(
      //   map(docArray => {
      //     return docArray.map(e => {
      //       return {
      //         id: e.payload.doc.id,
      //         ...e.payload.doc.data()
      //       };
      //     });
      //   })
      // );
    // return docRef;
  }

  getWatchlistIds(userId: string) {
    this._watchlist = [];
    this.afDb.collection('watchlist', (ref) => ref.where('userId', '==', userId))
    .valueChanges()
      .subscribe((res) => {
        res.forEach((x) => {
         this._watchlist.push(x['adId']);
        });
        this.watchlistChanged.next([...this._watchlist]);
      });
  }

  getAd(docId: string): any {
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
      });
  }

  editAd(ad: any, adId: string) {
    return this.afDb.collection<ListAd>('cars').doc(adId).update(ad);
  }
  watch (adId: string) {
    // console.log(adId + 'to watch');
    const record = {adId: adId, userId: useId};
    this.afDb.collection('watchlist').add(record)
      .then((docRef) => {
      this._watchlist.push(adId);
      this.getAllAds();
      return docRef.id;
      })
      .catch((err) => {
        console.log(err);
      });
  }
  watchNot (adId: string) {
    this.afDb.collection('watchlist',
      (ref => ref.where('adId', '==', adId).where('userId', '==', useId).limit(1)))
      .valueChanges({idField: 'id'})
      .subscribe(res => {
        // console.log(res[0]['id']);
        this.afDb.collection('watchlist').doc(res[0]['id']).delete().then(r => {
          this._watchlist.splice(this._watchlist.indexOf(res[0]['id']), 1);
          console.log('The car is removed from watchlist');
        });
    });
  }
}
