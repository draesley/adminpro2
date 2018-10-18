import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ImagePipe } from './image.pipe';

@NgModule({
  imports: [
    CommonModule
  ],
  declarations: [
    ImagePipe
  ],
  exports:[
    ImagePipe
  ]
})
export class PipesModule { }
