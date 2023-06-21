import { RouterModule, Routes } from "@angular/router";
import { NgModule } from "@angular/core";
import { AboutUsPageComponent } from "../about-us/pages/about-us-page/about-us-page.component";
import { ContactPageComponent } from "../contact/pages/contact-page/contact-page.component";
import { DashboardPageComponent } from "../dashboard/pages/dashboard-page/dashboard-page.component";
import { OffersPageComponent } from "../offers/pages/offers-page/offers-page.component";
import { ShoppingCartPageComponent } from "../offers/pages/shopping-cart-page/shopping-cart-page.component";
import { OffersResolver } from "../offers/core/resolvers/OfferResolver";
import { DashboardResolver } from "../dashboard/core/resolvers/DashboardResolver";

const routes: Routes = [
  {
    path: '',
    redirectTo: 'dashboard',
    pathMatch: 'full'
  },
  {
    path: 'dashboard',
    component: DashboardPageComponent,
    loadChildren: () => import('../dashboard/dashboard.module').then(m => m.DashboardModule),
    resolve: {
      dashboard: DashboardResolver
    }
  },
  {
    path: 'contact',
    component: ContactPageComponent,
    loadChildren: () => import('../contact/contact.module').then(m => m.ContactModule),
  },
  {
    path: 'about-us',
    component: AboutUsPageComponent,
    loadChildren: () => import('../about-us/about-us.module').then(m => m.AboutUsModule),
  },
  {
    path: 'offers',
    component: OffersPageComponent,
    loadChildren: () => import('../offers/offers.module').then(m => m.OffersModule),
    resolve: {
      offers: OffersResolver
    }
  },
  {
    path: 'shopping-cart',
    component: ShoppingCartPageComponent,
    loadChildren: () => import('../offers/offers.module').then(m => m.OffersModule),
    resolve: {
      offers: OffersResolver
    }
  },
]

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class MainRoutingModule { }
