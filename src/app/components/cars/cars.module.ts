import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import { AdCreateComponent } from './ad-create/ad-create.component';
import { AdListComponent } from './ad-list/ad-list.component';
import {AdService} from '../../core/services/ad.service';
import { AdComponent } from './ad/ad.component';
import { AdDetailsComponent } from './ad-details/ad-details.component';
import {RouterModule} from '@angular/router';
import { MyAdsComponent } from './my-ads/my-ads.component';
import { AdEditComponent } from './ad-edit/ad-edit.component';
import { MyWatchlistComponent } from './my-watchlist/my-watchlist.component';
import {AuthGuardService as AuthGuard} from '../../core/guards/auth-guard.service';
import {DetailsResolver} from '../../core/services/resolvers/details.resolver';
import { UploadListComponent } from './upload-list/upload-list.component';



@NgModule({
  declarations: [AdCreateComponent,
    AdListComponent,
    AdComponent,
    AdDetailsComponent,
    MyAdsComponent,
    AdEditComponent,
    MyWatchlistComponent,
    UploadListComponent],
    imports: [
        CommonModule,
        ReactiveFormsModule,
        RouterModule.forChild([
            {path: 'create', component: AdCreateComponent},
            {path: 'list', component: AdListComponent},
            {path: 'my', component: MyAdsComponent},
            {path: 'watchlist', component: MyWatchlistComponent},
            {path: 'details/:id', component: AdDetailsComponent, resolve: {ad: DetailsResolver}},
            {path: 'edit/:id', component: AdEditComponent},
        ]),
        FormsModule,
    ],
  providers: [
    AdService,
  ]
})
export class CarsModule { }
