import { TestBed } from '@angular/core/testing';

import { TranslateRevelationTypeService } from './translate-revelation-type.service';

describe('TranslateRevelationTypeService', () => {
  let service: TranslateRevelationTypeService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(TranslateRevelationTypeService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
