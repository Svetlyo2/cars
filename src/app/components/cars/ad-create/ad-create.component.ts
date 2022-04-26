import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {AdService} from '../../../core/services/ad.service';
import {Router} from '@angular/router';
import {AuthService} from '../../../core/services/auth.service';
import {FileUploadService} from '../../../core/services/file-upload.service';
import {FileUpload} from '../../../core/models/file-upload';
import firebase from 'firebase';
import Timestamp = firebase.firestore.Timestamp;

const currentYear = new Date().getFullYear();
@Component({
  selector: 'app-ad-create',
  templateUrl: './ad-create.component.html',
  styleUrls: ['./ad-create.component.css']
})
export class AdCreateComponent implements OnInit {
  adForm: FormGroup;
  selectedFiles?: FileList;
  currentFileUpload?: FileUpload;
  percentage = 0;
  // fileUploads: any[];
  fileUploads = [];
  private isEdit = false;

  constructor(private fb: FormBuilder,
              private adService: AdService,
              private authService: AuthService,
              private uploadService: FileUploadService,
              private router: Router) { }

  ngOnInit(): void {
    this.uploadService.uploads = [];
    // console.log(this.fileUploads);
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
    this.fileUploads = this.uploadService.uploads;
  }
  get f(){
    return this.adForm.controls;
  }

  publishAd(): void {
    const uploads = this.uploadService.uploads;
    const form = this.adForm.value;
    form.make = form.make.toUpperCase().trim();
    form.model = form.model.toUpperCase().trim();
    form.createdOn = Timestamp.now();
    form.ownerId = this.authService.getCurrentUserId();
    form.uploads = [];
    if (uploads.length > 0){
      form.image = this.uploadService.uploads[0]['url'];
      for (let i = 0; i < uploads.length; i++) {
        form.uploads[i] = this.uploadService.uploads[i];
      }
      // console.log('form ', form.uploads);
    }
    this.adService.createAd(form);
    this.router.navigate(['/cars/list']);
  }
  selectFile(event: any): void {
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

  deleteFileUpload(fileName: string): void {
    this.uploadService.deleteFile(fileName);
    this.uploadService.deleteFileStorage(fileName);
    this.fileUploads = this.uploadService.uploads;
  }
  closeCreate(): void {
    this.fileUploads = this.uploadService.uploads;
    if (this.fileUploads.length > 0){
      this.fileUploads.map((f) => f.name)
        .forEach((n) => this.uploadService.deleteFileStorage(n));
    }
    this.uploadService.uploads = [];
    // this.fileUploads = [];
    this.router.navigate(['/cars/my']);
  }
}
