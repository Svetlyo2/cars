import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {ListAd} from '../../../core/models/list-ad';
import {AdService} from '../../../core/services/ad.service';
import {Router} from '@angular/router';

const currentDate = new Date().getDate().toLocaleString();

@Component({
  selector: 'app-ad',
  templateUrl: './ad.component.html',
  styleUrls: ['./ad.component.css']
})
export class AdComponent implements OnInit {
  @Input() ad: ListAd;
  @Output() newItemEvent = new EventEmitter<string>();
  userId: string;
  isWatchlist = false;
  isNew = false;

  constructor(private adService: AdService, private router: Router) {
  }

  ngOnInit(): void {
    this.userId = localStorage.getItem('userId');
    this.isWatchlist = this.router.url.split('/')[2] === 'watchlist';
    this.calcDateDifference();
  }

  changeWatch(): void {
    this.newItemEvent.emit(this.ad.id);
  }
  calcDateDifference () {
    const created = new Date(this.ad.createdOn.toDate());
    const now = new Date();
    if ((now.getDate() - created.getDate()) < 7) {
      this.isNew = true;
    }
  }
}
