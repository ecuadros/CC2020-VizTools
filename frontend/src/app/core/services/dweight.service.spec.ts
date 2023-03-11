import { TestBed } from '@angular/core/testing';

import { DWeightService } from './dweight.service';

describe('DWeightService', () => {
  let service: DWeightService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(DWeightService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
