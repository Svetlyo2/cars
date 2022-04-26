import {Injectable} from '@angular/core';
import {AngularFirestore} from '@angular/fire/firestore';
import {Observable, Subject, Subscription} from 'rxjs';
import {Ad} from '../models/ad';
import {ListAd} from '../models/list-ad';
import {CreateAd} from '../models/create-ad';
import {Router} from '@angular/router';
import {ToastrService} from 'ngx-toastr';

const useId: string = localStorage.getItem('userId');

@Injectable({
  providedIn: 'root'
})
export class AdService {
  private _myAds: ListAd[] = [];
  myAdsChanged = new Subject<ListAd[]>();

  constructor(private afDb: AngularFirestore,
              private router: Router,
              private toastr: ToastrService) {
  }

  createAd(data: CreateAd): any {
    this.afDb.collection<CreateAd>('cars').add(data)
      .then((docRef) => {
        this.toastr.success('Your add was published!');
        // console.log('from create ', docRef.id);
      })
      .catch((err) => {
        console.log(err);
        this.toastr.error('Something went wrong while publishing the ad!');
      });
  }

  getAllAds(): Observable<ListAd[]> {
    return this.afDb.collection<ListAd>('cars')
      .valueChanges({idField: 'id'});
  }

  getMyAds(): void {
    // let docRef = this.afDb.collection<ListAd>('cars', (ref) => ref.where('ownerId', '==', ownerId))
    this.afDb.collection<ListAd>('cars',
      (ref) => ref.where('ownerId', '==', useId))
      .valueChanges({idField: 'id'})
      .subscribe((res) => {
        this._myAds = res;
        this.myAdsChanged.next([...this._myAds]);
      });
  }

  getNewWatchlist(): Observable<any> {
    return this.afDb.collection('watchlist',
      (ref) => ref.where('userId', '==', useId))
      .valueChanges({idField: 'id'});
  }

  // getByMake(make: string): Observable<any> {
  //   return this.afDb.collection<ListAd>('cars',
  //     (ref) => ref.where('make', '==', make))
  //     .valueChanges({idField: 'id'});
  // }
  // getByMakeAndModel(make: string, model: string): Observable<any> {
  //   return this.afDb.collection<ListAd>('cars',
  //     (ref) => ref.where('make', '==', make)
  //       .where('model', '==', model))
  //     .valueChanges({idField: 'id'});
  // }

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

  isWatched(adId: string): Observable<any> {
    return this.afDb.collection('watchlist',
      (ref => ref.where('adId', '==', adId).where('userId', '==', useId))).get();
  }
  adToWatchlist(adId: string): void {
    console.log(adId, ' to be added from service', useId);
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
  removeFromWatchlist(docId: string): void {
    console.log('service will delete:', docId);
    this.afDb.collection('watchlist').doc(docId).delete()
      .then((a) => {
        this.toastr.success('The car was removed from watchlist');
      })
      .catch(err => {
        console.log(err);
        this.toastr.error('Something went wrong while removing from watchlist!');
      });
  }

  // changeWatch(adId: string) {
  //   this.isWatched(adId)
  //     .pipe(
  //       map(r => {
  //         console.log('from map', r.size);
  //         if (r.size > 0) {
  //           return r.docs[0].id;
  //         }
  //       })
  //     )
  //     .subscribe(docId => {
  //       if (docId !== undefined) {
  //         console.log('to delete:', docId);
  //         this.afDb.collection('watchlist').doc(docId).delete()
  //           .then((a) => {
  //             this.toastr.success('The car was removed from watchlist');
  //           })
  //           .catch(err => {
  //             console.log(err);
  //             this.toastr.error('Something went wrong while removing from watchlist!');
  //           });
  //       } else {
  //         console.log('to be added');
  //         const record = {adId, userId: useId};
  //         this.afDb.collection('watchlist').add(record)
  //           .then((docRef) => {
  //             this.toastr.success('Car added to watchlist');
  //             // return docRef.id;
  //           })
  //           .catch((err) => {
  //             console.log(err);
  //             this.toastr.error('Something went wrong while adding to watchlist!');
  //           });
  //       }
  //     });
  // }
}
