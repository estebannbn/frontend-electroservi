import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ServiciosCargo } from './servicios-cargo';

describe('ServiciosCargo', () => {
  let component: ServiciosCargo;
  let fixture: ComponentFixture<ServiciosCargo>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ServiciosCargo],
    }).compileComponents();

    fixture = TestBed.createComponent(ServiciosCargo);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
