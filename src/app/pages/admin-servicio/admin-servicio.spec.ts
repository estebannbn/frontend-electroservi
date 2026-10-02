import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminServicio } from './admin-servicio';

describe('AdminServicio', () => {
  let component: AdminServicio;
  let fixture: ComponentFixture<AdminServicio>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AdminServicio],
    }).compileComponents();

    fixture = TestBed.createComponent(AdminServicio);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
