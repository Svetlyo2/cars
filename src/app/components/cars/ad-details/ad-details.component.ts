import { Component, OnInit } from '@angular/core';
import {AdService} from '../../../core/services/ad.service';
import {Ad} from '../../../core/models/ad';
import {ActivatedRoute} from '@angular/router';
import {FileUpload} from '../../../core/models/file-upload';

@Component({
  selector: 'app-ad-details',
  templateUrl: './ad-details.component.html',
  styleUrls: ['./ad-details.component.css']
})
export class AdDetailsComponent implements OnInit {
  ad: Ad;
  fileUploads: FileUpload[];

  constructor(private adService: AdService, private route: ActivatedRoute) { }

  ngOnInit(): void {
    this.route.data.subscribe( (data) => {
      this.ad = data.ad;
      this.fileUploads = this.ad.uploads;
      }
    );
    // this.route.params.subscribe(data => {
    //   const id = data['id'];
    //   this.adService.getAd(id)
    //     .subscribe((d) => {
    //       this.ad = d;
    //     });
    // });
  }

  deleteAd(id: string) {
    this.adService.deleteAdById(id);
  }
  showImage(url: string) {
    // console.log(url);
    this.ad.image = url;
  }
}
