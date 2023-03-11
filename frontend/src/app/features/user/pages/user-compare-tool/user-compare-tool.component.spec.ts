import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UserCompareToolComponent } from './user-compare-tool.component';

describe('UserCompareToolComponent', () => {
  let component: UserCompareToolComponent;
  let fixture: ComponentFixture<UserCompareToolComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ UserCompareToolComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(UserCompareToolComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
