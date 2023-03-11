import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BlockLayoutComponent } from './block-layout.component';

describe('BlockLayoutComponent', () => {
  let component: BlockLayoutComponent;
  let fixture: ComponentFixture<BlockLayoutComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BlockLayoutComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(BlockLayoutComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
