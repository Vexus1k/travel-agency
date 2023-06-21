import { RouterModule, Routes } from "@angular/router";
import { NgModule } from "@angular/core";
import { RegisterPageComponent } from "./pages/register-page/register-page.component";
import { LoginPageComponent } from "./pages/login-page/login-page.component";
import { VerifyEmailPageComponent } from "./pages/verify-email-page/verify-email-page.component";
import { ForgotPasswordPageComponent } from "./pages/forgot-password-page/forgot-password-page.component";

const routes: Routes = [
    {
      path: 'login',
      component: LoginPageComponent,
    },
    {
      path: 'register',
      component: RegisterPageComponent
    },
    {
      path: 'verify-email',
      component: VerifyEmailPageComponent
    },
    {
      path: 'forgot-password',
      component: ForgotPasswordPageComponent
    },
    {
      path: 'logout',
      component: RegisterPageComponent
    }
]

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AuthRoutingModule { }
