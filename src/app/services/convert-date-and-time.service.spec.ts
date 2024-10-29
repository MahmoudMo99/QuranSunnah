import { TestBed } from '@angular/core/testing';

import { ConvertDateAndTimeService } from './convert-date-and-time.service';

describe('ConvertDateAndTimeService', () => {
  let service: ConvertDateAndTimeService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ConvertDateAndTimeService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
