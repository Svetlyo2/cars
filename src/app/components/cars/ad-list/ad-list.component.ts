import { Component, OnInit } from '@angular/core';
import {AdService} from '../../../core/services/ad.service';
import {ListAd} from '../../../core/models/list-ad';

@Component({
  selector: 'app-ad-list',
  templateUrl: './ad-list.component.html',
  styleUrls: ['./ad-list.component.css']
})
export class AdListComponent implements OnInit {
  ads: ListAd[];
  constructor(private adService: AdService) { }

  ngOnInit(): void {
    this.getAds();
  }
  getAds(){
    this.adService.getAllAds();
    this.adService.allAdsChanged
      .subscribe((res) => {
      this.ads = res;
      // console.log(this.ads);
      // console.log(res[0].payload.doc.data());
    });
  }
}
