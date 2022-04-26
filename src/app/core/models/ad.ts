import firebase from 'firebase';
import Timestamp = firebase.firestore.Timestamp;

export interface Ad {
  id: string;
  make: string;
  model: string;
  year: number;
  mileage: number;
  price: number;
  fuelType: string;
  createdOn: Timestamp;
  description: string;
  image: string;
  town: string;
  phoneNumber: string;
  ownerId: string;
  uploads: any[];
  isWatched: boolean;
}
