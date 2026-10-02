import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PedirRepuestos } from './pedir-repuestos';

describe('PedirRepuestos', () => {
  let component: PedirRepuestos;
  let fixture: ComponentFixture<PedirRepuestos>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PedirRepuestos],
    }).compileComponents();

    fixture = TestBed.createComponent(PedirRepuestos);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
