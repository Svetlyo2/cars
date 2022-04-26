import firebase from 'firebase';
import Timestamp = firebase.firestore.Timestamp;

export interface ListAd {
  id: string;
  make: string;
  model: string;
  image: string;
  year: number;
  mileage: number;
  price: number;
  ownerId: string;
  createdOn: Timestamp;
  isWatched: boolean;
}
