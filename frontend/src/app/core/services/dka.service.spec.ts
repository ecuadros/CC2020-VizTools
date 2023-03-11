import { TestBed } from '@angular/core/testing';

import { DKAService } from './dka.service';

describe('DKAService', () => {
  let service: DKAService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(DKAService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
