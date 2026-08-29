import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminRepuestos } from './admin-repuestos';

describe('AdminRepuestos', () => {
  let component: AdminRepuestos;
  let fixture: ComponentFixture<AdminRepuestos>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AdminRepuestos],
    }).compileComponents();

    fixture = TestBed.createComponent(AdminRepuestos);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
