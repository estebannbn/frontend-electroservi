import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RegistroTecnico } from './registro-tecnico';

describe('RegistroTecnico', () => {
  let component: RegistroTecnico;
  let fixture: ComponentFixture<RegistroTecnico>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RegistroTecnico],
    }).compileComponents();

    fixture = TestBed.createComponent(RegistroTecnico);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
