import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { Product.CatalogComponent } from './product.catalog.component';

describe('Product.CatalogComponent', () => {
  let component: Product.CatalogComponent;
  let fixture: ComponentFixture<Product.CatalogComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ Product.CatalogComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(Product.CatalogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
