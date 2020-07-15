import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

//Angular-Material
import { MaterialModule } from './utilities/material';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BusinessComponent } from './components/business/business.component';

//Google Maps API
import { AgmCoreModule } from '@agm/core';


import { BusinessCatalogComponent } from './components/business.catalog/business.catalog.component';
import { ProductComponent } from './components/product/product.component';
import { ProductCatalogComponent, ProductDetailDialog } from './components/product.catalog/product.catalog.component';
import { UserComponent } from './components/user/user.component';
import { ExtraComponent } from './components/extra/extra.component';
import { CartComponent, QuantityModificatorDialog } from './components/cart/cart.component';
import { UserAddressComponent, AddressDialog } from './components/user.address/user.address.component';
import { BusinessOrderComponent } from './components/business.order/business.order.component';

@NgModule({
  declarations: [
    AppComponent,
    BusinessComponent,
    BusinessCatalogComponent,
    ProductComponent,
    ProductCatalogComponent,
    ProductDetailDialog,
    UserComponent,
    AddressDialog,
    ExtraComponent,
    CartComponent,
    QuantityModificatorDialog,
    UserAddressComponent,
    BusinessOrderComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    AgmCoreModule.forRoot({
      apiKey: 'AIzaSyDN3aa_wsGbgJiRxmVH3Jrg1To9MeAiVhI'
    }),
    MaterialModule,
    HttpClientModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
