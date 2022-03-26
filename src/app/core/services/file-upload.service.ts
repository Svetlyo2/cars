import {Injectable} from '@angular/core';
import {AngularFireDatabase} from '@angular/fire/database';
import {AngularFireStorage} from '@angular/fire/storage';
import {FileUpload} from '../models/file-upload';
import {Observable} from 'rxjs';
import {finalize} from 'rxjs/operators';
import {AngularFirestore} from '@angular/fire/firestore';
import {ToastrService} from 'ngx-toastr';

@Injectable({
  providedIn: 'root'
})
export class FileUploadService {
  private basePath = '/uploads';
  uploads = [];
  addedFiles = [];

  constructor(private afdb: AngularFirestore,
              private db: AngularFireDatabase,
              private storage: AngularFireStorage) {
  }

  pushFileToStorage(fileUpload: FileUpload): Observable<number | undefined> {
    const fileName = `${fileUpload.file.name.split('.').slice(0, -1).join('.')}_${new Date().getTime()}`;
    const filePath = `${this.basePath}/${fileName}`;
    const storageRef = this.storage.ref(filePath);
    const uploadTask = this.storage.upload(filePath, fileUpload.file);
    uploadTask.snapshotChanges().pipe(
      finalize(() => {
        storageRef.getDownloadURL().subscribe(downloadURL => {
          const fileInfo = {url: downloadURL, name: fileName};
          this.uploads.push(fileInfo);
          this.addedFiles.push(fileName);
        });
      })
    ).subscribe();
    return uploadTask.percentageChanges();
  }

  getFiles(numberItems: number) {
    return this.afdb.collection(this.basePath);
  }

  deleteFile(fileName: string): void {
    const filtered = this.uploads.filter(x => x.name !== fileName);
    this.uploads = [...filtered];
  }

  deleteFileStorage(name: string): void {
    const storageRef = this.storage.ref(this.basePath);
    storageRef.child(name).delete();
  }
}
