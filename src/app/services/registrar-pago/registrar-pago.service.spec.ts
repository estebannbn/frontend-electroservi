import { TestBed } from '@angular/core/testing';

import { RegistrarPagoService } from './registrar-pago.service';

describe('RegistrarPagoService', () => {
  let service: RegistrarPagoService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(RegistrarPagoService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
