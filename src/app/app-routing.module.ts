import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {HomeComponent} from './components/home/home.component';
import {SigninComponent} from './components/authentication/signin/signin.component';
import {SignupComponent} from './components/authentication/signup/signup.component';
import {AdCreateComponent} from './components/cars/ad-create/ad-create.component';
import {AdListComponent} from './components/cars/ad-list/ad-list.component';
import {AdDetailsComponent} from './components/cars/ad-details/ad-details.component';
import {MyAdsComponent} from './components/cars/my-ads/my-ads.component';
import {AdEditComponent} from './components/cars/ad-edit/ad-edit.component';
import {MyWatchlistComponent} from './components/cars/my-watchlist/my-watchlist.component';
import {AuthGuardService as AuthGuard} from './core/guards/auth-guard.service';
import {DetailsResolver} from './core/services/resolvers/details.resolver';

const routes: Routes = [
  { path: '', pathMatch: 'full', component: HomeComponent},
  { path: 'home', component: HomeComponent },
  { path: 'signin', component: SigninComponent },
  { path: 'signup', component: SignupComponent },
  { path: 'cars', loadChildren: './components/cars/cars.module#CarsModule',
    // resolve: {watchList: DetailsResolver},
    // canActivate: [AuthGuard],
  },
  // { path: 'cars/create', component: AdCreateComponent },
  // { path: 'cars/list', component: AdListComponent },
  // { path: 'cars/my', component: MyAdsComponent },
  // { path: 'cars/watchlist', component: MyWatchlistComponent },
  // { path: 'cars/details/:id', component: AdDetailsComponent },
  // { path: 'cars/edit/:id', component: AdEditComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
