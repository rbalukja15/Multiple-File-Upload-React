import {Component, Input, OnInit} from '@angular/core';

@Component({
  selector: 'app-progress',
  templateUrl: './progress.component.html',
  styleUrls: ['./progress.component.css']
})
export class ProgressComponent implements OnInit {
  @Input('previewFile') file: File[];
  @Input('uploadFile') uploadFile: File;
  @Input('fileProgress') fileProgress: any;

  constructor() { }

  ngOnInit(): void {
  }

}
