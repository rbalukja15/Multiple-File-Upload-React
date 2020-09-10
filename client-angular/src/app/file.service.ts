import { Injectable } from '@angular/core';
import {HttpClient, HttpRequest} from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class FileService {
  constructor(private http: HttpClient) { }

  // POST /
  uploadFile(formData: any){
    const endpoint = 'http://localhost:5000/file';
    const req = new HttpRequest('POST', endpoint, formData, {
      reportProgress: true,
      responseType: 'json'
    });
    return this.http.request(req);
  }
}
