import {Component, Input, OnInit, Output, EventEmitter} from '@angular/core';
import {Router} from '@angular/router';

@Component({
  selector: 'app-upload-list',
  templateUrl: './upload-list.component.html',
  styleUrls: ['./upload-list.component.css']
})

export class UploadListComponent implements OnInit {
  @Input() fileUploads: any[];
  @Output() newItemEvent = new EventEmitter<string>();
  isDetails = false;

  constructor(private router: Router) { }

  ngOnInit(): void {
    this.isDetails = this.router.url.split('/')[2] === 'details';
  }

  deleteItem(fileInfo) {
    this.newItemEvent.emit(fileInfo.name);
  }
  showFile(fileInfo) {
    this.newItemEvent.emit(fileInfo.url);
  }
}
