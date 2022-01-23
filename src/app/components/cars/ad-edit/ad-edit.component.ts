import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {AdService} from '../../../core/services/ad.service';
import {ActivatedRoute, Router} from '@angular/router';

const currentYear = new Date().getFullYear();
@Component({
  selector: 'app-ad-edit',
  templateUrl: './ad-edit.component.html',
  styleUrls: ['./ad-edit.component.css']
})
export class AdEditComponent implements OnInit {
  adForm: FormGroup;
  editLink: string;
  ad: any;
  isAdLoaded = false;

  constructor(private fb: FormBuilder,
              private adService: AdService,
              private route: ActivatedRoute,
              private router: Router) { }

  ngOnInit(): void {
    this.adForm = this.fb.group({
      make: ['', [Validators.required, Validators.minLength(2)]],
      model: ['', [Validators.required]],
      year: ['', [Validators.required, Validators.min(1970), Validators.max(currentYear)]],
      mileage: ['', [Validators.required, Validators.min(0)]],
      price: ['', [Validators.required, Validators.min(0)]],
      fuelType: ['', [Validators.required]],
      image: ['', []],
      town: ['', [Validators.required, Validators.minLength(3)]],
      phoneNumber: ['', [Validators.required, Validators.minLength(8)]],
      description: ['', [Validators.required, Validators.minLength(5), Validators.maxLength(600)]],
    });
    this.adService.getAd(this.route.snapshot.params.id)
      .subscribe((data) => {
        this.ad = data;
        this.editLink = '/cars/edit/' + this.route.snapshot.params.id;
        this.adForm.controls.make.setValue(data.make);
        this.adForm.controls.model.setValue(data.model);
        this.adForm.controls.year.setValue(data.year);
        this.adForm.controls.mileage.setValue(data.mileage);
        this.adForm.controls.price.setValue(data.price);
        this.adForm.controls.fuelType.setValue(data.fuelType);
        this.adForm.controls.image.setValue(data.image);
        this.adForm.controls.town.setValue(data.town);
        this.adForm.controls.phoneNumber.setValue(data.phoneNumber);
        this.adForm.controls.description.setValue(data.description);
      });
  }

  get f(){
    return this.adForm.controls;
  }

  submitAd(){
    const obj = {...this.ad, ...{make: this.f.make.value,
        model: this.f.model.value,
        year: this.f.year.value,
        mileage: this.f.mileage.value,
        price: this.f.price.value,
        fuelType: this.f.fuelType.value,
        image: this.f.image.value,
        town: this.f.town.value,
        phoneNumber: this.f.phoneNumber.value,
        description: this.f.description.value}
    };

    this.adService.editAd(obj, this.route.snapshot.params.id)
      .then((data) => {
        this.router.navigate(['cars/details', this.route.snapshot.params.id]);
      })
      .catch((err) => {
        console.log(err);
      });
  }
}
