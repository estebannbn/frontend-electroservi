import { TestBed } from '@angular/core/testing';

import { TablaTecnicos } from './tabla-tecnicos';

describe('TablaTecnicos', () => {
  let service: TablaTecnicos;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(TablaTecnicos);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
