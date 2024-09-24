import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-image-list',
  templateUrl: './image-list.component.html'
})
export class ImageListComponent implements OnInit {

  images: any[] = [];  // Array to store images

  constructor(private http: HttpClient) {}

  ngOnInit(): void {
    this.loadImages();  // Load images on component initialization
  }

  // Method to load all images from the API
  loadImages(): void {
    this.http.get<any[]>('http://localhost:8080/api/images/all')  // Fetch images from the API
      .subscribe(data => {
        this.images = data;  // Assign the fetched data to the images array
      }, error => {
        console.error('Failed to fetch images', error);  // Handle fetch errors
      });
  }

  // Method to delete image by ID
  onDelete(imageId: number): void {
    const confirmDelete = confirm('Are you sure you want to delete this image?');
    if (confirmDelete) {
      this.http.delete(`http://localhost:8080/api/images/${imageId}`)  // API call to delete the image
        .subscribe(() => {
          // Remove the deleted image from the array after successful deletion
          this.images = this.images.filter(image => image.id !== imageId);
          console.log('Image deleted successfully');
        }, error => {
          console.error('Failed to delete image', error);  // Handle delete errors
        });
    }
  }
}
