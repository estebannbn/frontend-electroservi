import { TestBed } from '@angular/core/testing';

import { TablaTecnicosService } from './tabla-tecnicos.service';

describe('TablaTecnicosService', () => {
  let service: TablaTecnicosService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(TablaTecnicosService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
