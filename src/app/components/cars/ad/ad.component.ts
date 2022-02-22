import {Component, Input, OnInit} from '@angular/core';
import {ListAd} from '../../../core/models/list-ad';
import {AdService} from '../../../core/services/ad.service';

@Component({
  selector: 'app-ad',
  templateUrl: './ad.component.html',
  styleUrls: ['./ad.component.css']
})
export class AdComponent implements OnInit {
  @Input() ad: ListAd;
  userId: string;

  constructor(private adServise: AdService) {
  }

  ngOnInit(): void {
    this.userId = localStorage.getItem('userId');
  }

  changeWatch() {
    this.adServise.changeWatch(this.ad.id);
  }

  // watch() {
  //   this.adServise.watch(this.ad.id);
  //   // this.ad.isWatched = true;
  // }
  //
  // watchNot() {
  //   this.adServise.watchNot(this.ad.id);
  //   // this.ad.isWatched = false;
  // }
}
