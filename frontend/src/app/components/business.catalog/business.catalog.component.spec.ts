import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { Business.CatalogComponent } from './business.catalog.component';

describe('Business.CatalogComponent', () => {
  let component: Business.CatalogComponent;
  let fixture: ComponentFixture<Business.CatalogComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ Business.CatalogComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(Business.CatalogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
