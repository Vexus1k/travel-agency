import { NgModule } from '@angular/core';
import { CommonModule, NgOptimizedImage } from '@angular/common';
import { DashboardPageComponent } from './pages/dashboard-page/dashboard-page.component';
import { FormsModule } from "@angular/forms";
import { OffersModule } from "../offers/offers.module";
import { CoreModule } from "../core/core.module";



@NgModule({
  declarations: [
    DashboardPageComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    NgOptimizedImage,
    OffersModule,
    CoreModule
  ]
})
export class DashboardModule { }
