import { Injectable } from '@angular/core';
import { HttpClient, HttpEventType, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ImageUploadService {

  private uploadUrl = 'http://localhost:8080/api/images/upload';  // Backend API URL

  constructor(private http: HttpClient) {}

  // Modify the method to accept both file and description
  uploadImage(file: File, description: string): Observable<any> {
    const formData: FormData = new FormData();
    formData.append('file', file);  // Add the image file to FormData
    formData.append('description', description);  // Add the description to FormData

    return this.http.post(this.uploadUrl, formData, {
      reportProgress: true,
      observe: 'events'
    });
  }
}
