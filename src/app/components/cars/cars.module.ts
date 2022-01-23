import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {ReactiveFormsModule} from '@angular/forms';
import { AdCreateComponent } from './ad-create/ad-create.component';
import { AdListComponent } from './ad-list/ad-list.component';
import {AdService} from '../../core/services/ad.service';
import { AdComponent } from './ad/ad.component';
import { AdDetailsComponent } from './ad-details/ad-details.component';
import {RouterModule} from '@angular/router';
import { MyAdsComponent } from './my-ads/my-ads.component';
import { AdEditComponent } from './ad-edit/ad-edit.component';



@NgModule({
  declarations: [AdCreateComponent, AdListComponent, AdComponent, AdDetailsComponent, MyAdsComponent, AdEditComponent],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    RouterModule,
  ],
  providers: [
    AdService,
  ]
})
export class CarsModule { }
