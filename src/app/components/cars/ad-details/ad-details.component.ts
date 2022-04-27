import {Component, OnInit} from '@angular/core';
import {AdService} from '../../../core/services/ad.service';
import {Ad} from '../../../core/models/ad';
import {ActivatedRoute} from '@angular/router';
import {FileUpload} from '../../../core/models/file-upload';
import {switchMap} from 'rxjs/operators';
import {Observable} from 'rxjs';

@Component({
  selector: 'app-ad-details',
  templateUrl: './ad-details.component.html',
  styleUrls: ['./ad-details.component.css']
})
export class AdDetailsComponent implements OnInit {
  ad: Ad;
  posted: string;
  fileUploads: FileUpload[];
  userId: string;
  ad$: Observable<any>;

  constructor(private adService: AdService, private route: ActivatedRoute) {
  }

  ngOnInit(): void {
    this.userId = localStorage.getItem('userId');
    this.ad$ = this.route.data;
    this.ad$.pipe(switchMap(d => {
      this.ad = d.ad;
      this.fileUploads = this.ad.uploads;
      return this.adService.isWatched(d.ad.id);
    }))
      .subscribe(res => {
        this.ad['isWatched'] = res.size > 0;
      });
  }

  changeWatch(): void {
    console.log('changeWatch():', this.ad.isWatched);
    if (this.ad.isWatched) {
      this.adService.isWatched(this.ad.id)
        .subscribe(( a => {
          if (a.size > 0) {
            console.log('delete doc: ', a.docs[0].id);
            this.adService.removeFromWatchlist(a.docs[0].id);
            this.ad.isWatched = false;
          }
        }));
    } else {
      this.adService.adToWatchlist(this.ad.id);
      this.ad.isWatched = true;
    }
  }

  deleteAd(id: string): void {
    this.adService.deleteAdById(id);
  }

  showImage(url: string): void {
    this.ad.image = url;
  }
}
