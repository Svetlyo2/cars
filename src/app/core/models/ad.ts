export interface Ad {
  id: string;
  make: string;
  model: string;
  year: number;
  mileage: number;
  price: number;
  fuelType: string;
  createdOn: Date;
  description: string;
  image: string;
  town: string;
  phoneNumber: string;
  ownerId: string;
  uploads: any[];
}
