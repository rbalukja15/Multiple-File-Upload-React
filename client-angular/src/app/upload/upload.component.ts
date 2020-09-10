import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-upload',
  templateUrl: './upload.component.html',
  styleUrls: ['./upload.component.css']
})
export class UploadComponent implements OnInit {
  file: any;
  previewFile: any;
  progress: any;

  constructor() { }

  ngOnInit(): void {
  }

}
