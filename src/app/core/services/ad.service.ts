import {Injectable} from '@angular/core';
import {AngularFirestore, AngularFirestoreCollection, CollectionReference} from '@angular/fire/firestore';
import {Observable, Subject, Subscription} from 'rxjs';
import {Ad} from '../models/ad';
import {ListAd} from '../models/list-ad';
import {CreateAd} from '../models/create-ad';
import {map} from 'rxjs/operators';
import {AuthService} from './auth.service';
import {Router} from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AdService {
  private _ad: Ad;
  // private adCollection: CollectionReference<ListAd>;
  private _allAds: ListAd[] = [];
  private _myAds: ListAd[] = [];
  allAdsChanged = new Subject<ListAd[]>();
  myAdsChanged = new Subject<ListAd[]>();

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
      .then((data) => {
        this.router.navigate(['cars/my']);
      });
  }

  editAd(ad: any, adId: string) {
    return this.afDb.collection<ListAd>('cars').doc(adId).update(ad);
  }
}
