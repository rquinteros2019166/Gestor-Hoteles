import { TestBed } from '@angular/core/testing';

import { ReservetionService } from './reservetion.service';

describe('ReservetionService', () => {
  let service: ReservetionService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ReservetionService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
