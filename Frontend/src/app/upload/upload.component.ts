import { Component } from '@angular/core';
import { HttpEventType } from "@angular/common/http";
import { ImageUploadService } from "../service/image-upload.service";
import {Router} from "@angular/router";

@Component({
  selector: 'app-upload',
  templateUrl: './upload.component.html',
  styleUrls: ['./upload.component.css']
})
export class UploadComponent {

  selectedFile: File | null = null;
  uploadProgress: number | null = null;
  uploadSuccess: boolean = false;
  description: string = '';

  constructor(private imageUploadService: ImageUploadService,private router: Router) {}

  // Handle file selection
  onFileSelected(event: any): void {
    this.selectedFile = event.target.files[0];
  }

  // Handle the upload process
  onUpload(): void {
    if (this.selectedFile && this.description) {
      this.uploadSuccess = false; // Reset success message
      this.imageUploadService.uploadImage(this.selectedFile, this.description).subscribe(
        event => {
          if (event.type === HttpEventType.UploadProgress && event.total) {
            this.uploadProgress = Math.round(100 * event.loaded / event.total);
          } else if (event.type === HttpEventType.Response) {
            console.log('Image uploaded successfully');
            this.uploadProgress = null;
            this.uploadSuccess = true; // Display success message
            this.resetForm();  // Clear the form after successful upload
          }
        },
        error => {
          console.error('Upload failed', error);
          this.uploadProgress = null;
        }
      );
    } else {
      console.error('File or description is missing');
    }
  }

  // Method to reset the form
  resetForm(): void {
    this.selectedFile = null;        // Clear the selected file
    this.description = '';           // Clear the description
    const fileInput = <HTMLInputElement>document.getElementById('fileInput');
    if (fileInput) {
      fileInput.value = '';          // Reset the file input field
    }


  }

}
