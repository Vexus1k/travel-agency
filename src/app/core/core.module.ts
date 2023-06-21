import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CapitalizePipe } from "./pipes/capitalize-first-letter.pipe";
import { DevideWordsPipe } from "./pipes/devide-words.pipe";



@NgModule({
  declarations: [
    CapitalizePipe,
    DevideWordsPipe
  ],
  exports: [
    CapitalizePipe,
    DevideWordsPipe
  ],
  imports: [
    CommonModule,
  ]
})
export class CoreModule { }
