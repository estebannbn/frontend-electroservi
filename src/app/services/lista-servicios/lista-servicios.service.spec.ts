import { TestBed } from '@angular/core/testing';

import { ListaServiciosService } from './lista-servicios.service';

describe('ListaServiciosService', () => {
  let service: ListaServiciosService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ListaServiciosService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
