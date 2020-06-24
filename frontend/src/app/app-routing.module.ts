import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { BusinessComponent } from './components/business/business.component';
import { BusinessCatalogComponent } from './components/business.catalog/business.catalog.component';
import { ProductComponent } from './components/product/product.component';
import { ProductCatalogComponent } from './components/product.catalog/product.catalog.component';
import { UserComponent } from './components/user/user.component';
import { ExtraComponent } from './components/extra/extra.component';


const routes: Routes = [
  //{ path: '', redirectTo: '/dashboard', pathMatch: 'full' },
  { path: 'business', component: BusinessComponent },
  { path: 'business/catalog', component: BusinessCatalogComponent },
  { path: 'product/create/:id', component: ProductComponent },
  { path: 'product/catalog/:id', component: ProductCatalogComponent },
  { path: 'extra/create/:id', component: ExtraComponent },
  { path: 'user', component: UserComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
