import { Component, OnInit } from '@angular/core';
import {FileService} from './file.service';
import { FileUploader } from 'ng2-file-upload';
import { HttpClient } from '@angular/common/http';

const URL = 'http://localhost:5000/file';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit{
  public uploader: FileUploader = new FileUploader({
    url: URL,
    itemAlias: 'image'
  });

  title = 'my-new-app';
  file: [];
  imgArray = [];
  imgTypes = ['jpg', 'jpeg', 'png', 'gif'];
  images;
  multipleImages = [];

  constructor(private fileService: FileService, private http: HttpClient) {
  }

  ngOnInit() {
  }

  selectImage(event) {
    if (event.target.files.length > 0) {
      const file = event.target.files[0];
      this.images = file;
    }
  }

  selectMultipleImage(event){
    if (event.target.files.length > 0) {
      this.multipleImages = event.target.files;
    }
  }

  onMultipleSubmit(){
    const formData = new FormData();
    for (let img of this.multipleImages){
      formData.append('files', img);
    }

    this.fileService.uploadFile(formData).subscribe(e => {
    });

    // this.http.post<any>('http://localhost:5000/file', formData).subscribe(
    //   (res) => console.log(res),
    //   (err) => console.log(err)
    // );
  }
  // async handleUploadChange(event: any) {
  //   event.preventDefault();
  //   const files = event.target.files || [];
  //   for (let index = 0; index < files.length; index++) {
  //     const reader = new FileReader();
  //     const extension = files[index].name.split('.').pop().toLowerCase();
  //     const in_file = files[index];

  //     if ( this.imgTypes.indexOf(extension) > -1 ) {
  //       const readUploadedFileAsText = (inputFile) => {
  //         const fileReader = new FileReader();

  //         return new Promise((resolve, reject) => {
  //           fileReader.onerror = () => {
  //             fileReader.abort();
  //             reject(new DOMException('Problem parsing input file.'));
  //           };

  //           fileReader.onload = () => {
  //             resolve(fileReader.result);
  //           };
  //           fileReader.readAsDataURL(inputFile);
  //         });
  //       };

  //       const fileContents = await readUploadedFileAsText(in_file);
  //       this.imgArray.push(fileContents);
  //     }
  //     else{
  //       this.imgArray.push('');
  //     }

  //   }

  //   // console.log(this.imgArray);
  //   this.uploadFile(this.imgArray);
  // }

  // uploadFile(files){
  //   if (files.length) {
  //     const formData: FormData = new FormData();
  //     files.forEach(async file => {
  //       formData.append('files', file, file.name);
  //       this.fileService.uploadFile(formData).subscribe(e => {
  //       });
  //   });
  //   }
  // }
}
