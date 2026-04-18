import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TecnicosDashboard } from './tecnicos-dashboard';

describe('TecnicosDashboard', () => {
  let component: TecnicosDashboard;
  let fixture: ComponentFixture<TecnicosDashboard>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TecnicosDashboard],
    }).compileComponents();

    fixture = TestBed.createComponent(TecnicosDashboard);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
