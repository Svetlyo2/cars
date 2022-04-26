import {Component, OnDestroy, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {AdService} from '../../../core/services/ad.service';
import {ActivatedRoute, Router} from '@angular/router';
import {FileUploadService} from '../../../core/services/file-upload.service';
import {FileUpload} from '../../../core/models/file-upload';
import {ToastrService} from 'ngx-toastr';
import {Subscription} from 'rxjs';

const currentYear = new Date().getFullYear();

@Component({
  selector: 'app-ad-edit',
  templateUrl: './ad-edit.component.html',
  styleUrls: ['./ad-edit.component.css']
})
export class AdEditComponent implements OnInit, OnDestroy {
  adForm: FormGroup;
  editLink: string;
  ad: any;
  isAdLoaded = false;
  selectedFiles?: FileList;
  currentFileUpload?: FileUpload;
  percentage = 0;
  fileUploads: any[];
  private deleteList: string[] = [];
  getAdSub: Subscription;

  constructor(private fb: FormBuilder,
              private adService: AdService,
              private route: ActivatedRoute,
              private uploadService: FileUploadService,
              private router: Router,
              private toastr: ToastrService) {
  }

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
    this.getAdSub = this.adService.getAd(this.route.snapshot.params.id)
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
        this.uploadService.uploads = data.uploads;
        this.fileUploads = this.uploadService.uploads;
      });
  }

  ngOnDestroy(): void {
    this.getAdSub.unsubscribe();
  }

  get f() {
    return this.adForm.controls;
  }

  selectFile(event: any): void {
    if (this.fileUploads.length >= 5) {
      this.toastr.info('You can upload up to 5 images');
      return;
    }
    this.selectedFiles = event.target.files;
  }

  upload(): void {
    if (this.selectedFiles) {
      const file: File | null = this.selectedFiles.item(0);
      this.selectedFiles = undefined;
      if (file) {
        this.currentFileUpload = new FileUpload(file);
        this.uploadService.pushFileToStorage(this.currentFileUpload).subscribe(
          percentage => {
            this.percentage = Math.round(percentage ? percentage : 0);
          },
          error => {
            console.log(error);
          }
        );
      }
    }
  }

  removeImage(fileName: string): void {
    this.deleteList.push(fileName);
    this.uploadService.deleteFile(fileName);
    this.fileUploads = this.uploadService.uploads;
  }

  deleteFileUpload(fileName: string): void {
    this.uploadService.deleteFileStorage(fileName);
  }

  submitAd() {
    const obj = {
      ...this.ad, ...{
        make: this.f.make.value.toUpperCase(),
        model: this.f.model.value.toUpperCase(),
        year: this.f.year.value,
        mileage: this.f.mileage.value,
        price: this.f.price.value,
        fuelType: this.f.fuelType.value,
        image: this.fileUploads[0]['url'],
        town: this.f.town.value,
        phoneNumber: this.f.phoneNumber.value,
        description: this.f.description.value
      },
      uploads: this.fileUploads
    };
    if (this.deleteList.length > 0) {
      this.deleteList.forEach((x) => this.deleteFileUpload(x));
    }
    this.deleteList = [];
    this.fileUploads = [];
    this.adService.editAd(obj, this.route.snapshot.params.id)
      .then((data) => {
        this.router.navigate(['cars/details', this.route.snapshot.params.id]);
      })
      .catch((err) => {
        console.log(err);
      });
  }

  close(): void {
    if (this.deleteList.length > 0) {
      this.deleteList.forEach((x) => this.deleteFileUpload(x));
    }
    this.deleteList = [];
    if (this.uploadService.addedFiles.length > 0) {
      this.uploadService.addedFiles.forEach((x) => this.deleteFileUpload(x));
    }
    this.uploadService.addedFiles = [];
    this.uploadService.uploads = [];
    this.fileUploads = [];
    this.router.navigate(['/cars/details/' + this.route.snapshot.params.id]);
  }
}
