import { TestBed } from '@angular/core/testing';

import { RegistroFormService } from './registro-form.service';

describe('RegistroFormService', () => {
  let service: RegistroFormService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(RegistroFormService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
