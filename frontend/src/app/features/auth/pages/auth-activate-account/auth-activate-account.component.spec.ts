import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AuthActivateAccountComponent } from './auth-activate-account.component';

describe('AuthActivateAccountComponent', () => {
  let component: AuthActivateAccountComponent;
  let fixture: ComponentFixture<AuthActivateAccountComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AuthActivateAccountComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AuthActivateAccountComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
