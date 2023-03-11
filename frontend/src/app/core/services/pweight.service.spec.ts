import { TestBed } from '@angular/core/testing';

import { PWeightService } from './pweight.service';

describe('PWeightService', () => {
  let service: PWeightService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(PWeightService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
