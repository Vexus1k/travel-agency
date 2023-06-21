import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';
import { AngularFireAuthGuard } from "@angular/fire/compat/auth-guard";
import { redirectLoggedInTo, redirectUnauthorizedTo } from "@angular/fire/auth-guard";
import { BaseLayoutComponent } from "./_main/layouts/base-layout/base-layout.component";
import { BaseAuthLayoutComponent } from "./auth/layouts/base-auth-layout/base-auth-layout.component";
import { PageNotFoundComponent } from "./_main/layouts/page-not-found/page-not-found.component";

const redirectUnauthorizedToLogin = () => redirectUnauthorizedTo(['auth/login']);
const redirectAuthorizedToDashboard = () => redirectLoggedInTo(['main/dashboard']);

const routes: Routes = [
  {
    path: '',
    redirectTo: 'main',
    pathMatch: 'full'
  },
  {
    path: 'main',
    component: BaseLayoutComponent,
    loadChildren: () => import('./_main/main.module').then(m => m.MainModule),
    canActivate: [AngularFireAuthGuard],
    data: {authGuardPipe: redirectUnauthorizedToLogin}
  },
  {
    path: 'auth',
    component: BaseAuthLayoutComponent,
    loadChildren: () => import('./auth/auth.module').then(m => m.AuthModule),
    canActivate: [AngularFireAuthGuard],
    data: {authGuardPipe: redirectAuthorizedToDashboard}
  },
  {
    path: '**',
    component: PageNotFoundComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

