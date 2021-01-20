import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MultiprogramGridComponent } from './multiprogram-grid.component';

describe('MultiprogramGridComponent', () => {
  let component: MultiprogramGridComponent;
  let fixture: ComponentFixture<MultiprogramGridComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MultiprogramGridComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MultiprogramGridComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
