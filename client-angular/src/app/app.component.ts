import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  previewFile: File;
  imgArray: [''];
  file: [''];
  title = 'client-angular';
  imgTypes: ['jpg', 'jpeg', 'png', 'gif'];

  handleUploadChange(files: any){

    for (let index = 0; index < files.length; index++) {
      const reader = new FileReader();
      reader.onload = () => {
        if (reader.readyState === 2) {
          const extension = files[index].name.split('.').pop().toLowerCase();
          if ( this.imgTypes.indexOf(extension) > -1 )
            {
              this.imgArray.push(reader.result);
            }
          else
            {
              this.imgArray.push('');
            }
          this.file = this.imgArray;
        }
      };
    }
  }
}

