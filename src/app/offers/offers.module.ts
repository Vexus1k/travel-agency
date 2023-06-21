import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { OffersPageComponent } from './pages/offers-page/offers-page.component';
import { ReactiveFormsModule } from "@angular/forms";
import { ShoppingCartPageComponent } from './pages/shopping-cart-page/shopping-cart-page.component';
import { CoreModule } from "../core/core.module";
import { IsInArrayPipe } from './core/pipes/is-in-array.pipe';


@NgModule({
  declarations: [
    OffersPageComponent,
    ShoppingCartPageComponent,
    IsInArrayPipe
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    CoreModule
  ]
})
export class OffersModule { }
