import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { User.AddressComponent } from './user.address.component';

describe('User.AddressComponent', () => {
  let component: User.AddressComponent;
  let fixture: ComponentFixture<User.AddressComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ User.AddressComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(User.AddressComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
