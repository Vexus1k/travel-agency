import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { AngularFireModule } from '@angular/fire/compat'
import { CoreModule } from "./core/core.module";
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import { ToastrModule } from "ngx-toastr";
import { NgbModule } from "@ng-bootstrap/ng-bootstrap";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { RouterModule } from "@angular/router";
import { MainModule } from "./_main/main.module";
import { CloudinaryModule } from "@cloudinary/ng";
import { HTTP_INTERCEPTORS, HttpClientModule } from "@angular/common/http";
import localePl from '@angular/common/locales/pl';
import { registerLocaleData } from "@angular/common";
import { firebaseConfig } from "../../keys";
import { LoadingInterceptor } from "./core/interceptors/loading.interceptor";
import { UiModule } from "../assets/ui/ui.module";

registerLocaleData(localePl);

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    CoreModule,
    FormsModule,
    MainModule,
    RouterModule,
    CloudinaryModule,
    HttpClientModule,
    ReactiveFormsModule,
    AngularFireModule.initializeApp(firebaseConfig),
    BrowserAnimationsModule,
    NgbModule,
    ToastrModule.forRoot({
      closeButton: true,
      timeOut: 1000,
      extendedTimeOut: 500
    }),
    UiModule,
  ],
  providers: [
    {
      provide: HTTP_INTERCEPTORS, useClass: LoadingInterceptor, multi: true
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
