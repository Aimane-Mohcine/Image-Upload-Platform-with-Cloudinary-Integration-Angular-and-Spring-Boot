import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {ImageListComponent} from "./image-list/image-list.component";
import {UploadComponent} from "./upload/upload.component";

const routes: Routes = [  { path: '', redirectTo: '/upload', pathMatch: 'full' },
  { path: 'upload', component: UploadComponent },
  { path: 'images', component: ImageListComponent }
];


@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
