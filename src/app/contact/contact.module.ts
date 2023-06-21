import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ContactPageComponent } from "./pages/contact-page/contact-page.component";
import { CoreModule } from "../core/core.module";
import { ReactiveFormsModule } from "@angular/forms";


@NgModule({
  declarations: [
    ContactPageComponent
  ],
  imports: [
    CommonModule,
    CoreModule,
    ReactiveFormsModule
  ]
})
export class ContactModule { }
