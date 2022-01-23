import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {AdService} from '../../../core/services/ad.service';
import {Router} from '@angular/router';
import {AuthService} from '../../../core/services/auth.service';

const currentYear = new Date().getFullYear();
@Component({
  selector: 'app-ad-create',
  templateUrl: './ad-create.component.html',
  styleUrls: ['./ad-create.component.css']
})
export class AdCreateComponent implements OnInit {
  adForm: FormGroup;

  constructor(private fb: FormBuilder,
              private adService: AdService,
              private authService: AuthService,
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
  }
  get f(){
    return this.adForm.controls;
  }

  publishAd(): void {
    const form = this.adForm.value;
    form.createdOn = Date.now();
    form.ownerId = this.authService.getCurrentUserId();
    this.adService.createAd(form);
    // console.log(form.ownerId);
    this.router.navigate(['/cars/list']);
  }
}
