import { TestBed } from '@angular/core/testing';

import { DKAGService } from './dkag.service';

describe('DKAGService', () => {
  let service: DKAGService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(DKAGService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
