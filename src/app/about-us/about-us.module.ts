import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AboutUsPageComponent } from "./pages/about-us-page/about-us-page.component";
import { CoreModule } from "../core/core.module";


@NgModule({
  declarations: [
    AboutUsPageComponent,
  ],
  imports: [
    CommonModule,
    CoreModule
  ]
})
export class AboutUsModule { }
