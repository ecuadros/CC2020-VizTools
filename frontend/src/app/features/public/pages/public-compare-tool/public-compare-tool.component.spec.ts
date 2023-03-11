import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PublicCompareToolComponent } from './public-compare-tool.component';

describe('PublicCompareToolComponent', () => {
  let component: PublicCompareToolComponent;
  let fixture: ComponentFixture<PublicCompareToolComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PublicCompareToolComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PublicCompareToolComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
