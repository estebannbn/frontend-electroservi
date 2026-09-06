import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SolicitarInventario } from './solicitar-inventario';

describe('SolicitarInventario', () => {
  let component: SolicitarInventario;
  let fixture: ComponentFixture<SolicitarInventario>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SolicitarInventario],
    }).compileComponents();

    fixture = TestBed.createComponent(SolicitarInventario);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
