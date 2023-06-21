import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BaseLayoutComponent } from './layouts/base-layout/base-layout.component';
import { RouterOutlet } from "@angular/router";
import { MainRoutingModule } from "./main-routing.module";
import { PageNotFoundComponent } from './layouts/page-not-found/page-not-found.component';
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { CloudinaryModule } from "@cloudinary/ng";
import { OffersResolver } from "../offers/core/resolvers/OfferResolver";
import { DashboardResolver } from "../dashboard/core/resolvers/DashboardResolver";


@NgModule({
  declarations: [
    BaseLayoutComponent,
    PageNotFoundComponent
  ],
  imports: [
    CommonModule,
    RouterOutlet,
    MainRoutingModule,
    ReactiveFormsModule,
    FormsModule,
    CloudinaryModule
  ],
  exports: [
    BaseLayoutComponent
  ],
  providers: [
    OffersResolver,
    DashboardResolver
  ]
})
export class MainModule { }
