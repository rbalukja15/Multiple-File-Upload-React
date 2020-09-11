import { Component, OnInit } from '@angular/core';
import {FileService} from './file.service';
import { FileUploader } from 'ng2-file-upload';
import { HttpEventType } from '@angular/common/http';

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
  imgArray = [];
  imgTypes = ['jpg', 'jpeg', 'png', 'gif'];
  images;
  multipleImages = [];

  constructor(private fileService: FileService) {
  }

  ngOnInit() {
  }

  selectMultipleImage(event){
    if (event.target.files.length > 0) {
      this.multipleImages = event.target.files;
      for (let index = 0; index < this.multipleImages.length; index++) {
        const image = {
          name: '',
          url: '',
          progress: ''
        };
        const reader = new FileReader();

        image.name = this.multipleImages[index].name;
        reader.onload = () => {
          if (reader.readyState === 2) {
            const extension = this.multipleImages[index].name.split('.').pop().toLowerCase();
            if ( this.imgTypes.indexOf(extension) > -1 )
              {
                image.url = reader.result + '';
                this.imgArray.push(image);
              }
            else
              {
                this.imgArray.push('');
              }
          }
        };
        reader.readAsDataURL(event.target.files[index]);
    }
    }
  }

  onMultipleSubmit(){
    const formData = new FormData();
    for (let img of this.multipleImages){
      formData.append('files', img);
    }

    this.fileService.uploadFile(formData).subscribe(event => {
      if (event.type === HttpEventType.UploadProgress) {
        console.log('Upload Progress ' + Math.round(event.loaded / event.total ) * 100 + '%');
      }
      else if (event.type === HttpEventType.Response) {
        console.log(event);
      }
    });
  }
}
