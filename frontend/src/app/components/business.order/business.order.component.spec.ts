import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { Business.OrderComponent } from './business.order.component';

describe('Business.OrderComponent', () => {
  let component: Business.OrderComponent;
  let fixture: ComponentFixture<Business.OrderComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ Business.OrderComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(Business.OrderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
