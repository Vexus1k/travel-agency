import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RegisterPageComponent } from './pages/register-page/register-page.component';
import { LoginPageComponent } from './pages/login-page/login-page.component';
import { BaseAuthLayoutComponent } from './layouts/base-auth-layout/base-auth-layout.component';
import { RouterModule, RouterOutlet } from "@angular/router";
import { AuthRoutingModule } from "./auth-routing.module";
import { VerifyEmailPageComponent } from './pages/verify-email-page/verify-email-page.component';
import { ForgotPasswordPageComponent } from './pages/forgot-password-page/forgot-password-page.component';
import { ReactiveFormsModule } from "@angular/forms";


@NgModule({
  declarations: [
    RegisterPageComponent,
    LoginPageComponent,
    BaseAuthLayoutComponent,
    VerifyEmailPageComponent,
    ForgotPasswordPageComponent
  ],
  imports: [
    CommonModule,
    RouterOutlet,
    RouterModule,
    AuthRoutingModule,
    ReactiveFormsModule
  ]
})
export class AuthModule { }
