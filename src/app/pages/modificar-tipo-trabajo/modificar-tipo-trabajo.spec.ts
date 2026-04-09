import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ModificarTipoTrabajo } from './modificar-tipo-trabajo';

describe('ModificarTipoTrabajo', () => {
  let component: ModificarTipoTrabajo;
  let fixture: ComponentFixture<ModificarTipoTrabajo>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ModificarTipoTrabajo],
    }).compileComponents();

    fixture = TestBed.createComponent(ModificarTipoTrabajo);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
