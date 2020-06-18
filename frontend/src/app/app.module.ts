import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';

//Angular-Material
import { MaterialModule } from './material';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BusinessComponent } from './components/business/business.component';

//Google Maps API
import { AgmCoreModule } from '@agm/core';


import { BusinessCatalogComponent } from './components/business.catalog/business.catalog.component';
import { ProductComponent } from './components/product/product.component';
import { ProductCatalogComponent, DialogContentExampleDialog } from './components/product.catalog/product.catalog.component';

@NgModule({
  declarations: [
    AppComponent,
    BusinessComponent,
    BusinessCatalogComponent,
    ProductComponent,
    ProductCatalogComponent,
    DialogContentExampleDialog
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
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
