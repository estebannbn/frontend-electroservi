import { TestBed } from '@angular/core/testing';

import { SolicitarServicioService } from './solicitar-servicio';

describe('SolicitarServicio', () => {
  let service: SolicitarServicioService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(SolicitarServicioService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
