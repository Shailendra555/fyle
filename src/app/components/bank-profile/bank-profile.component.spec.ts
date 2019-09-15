import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BankProfileComponent } from './bank-profile.component';

describe('BankProfileComponent', () => {
  let component: BankProfileComponent;
  let fixture: ComponentFixture<BankProfileComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BankProfileComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BankProfileComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
