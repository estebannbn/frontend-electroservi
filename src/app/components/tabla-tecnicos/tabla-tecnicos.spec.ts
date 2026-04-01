import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TablaTecnicos } from './tabla-tecnicos';

describe('TablaTecnicos', () => {
  let component: TablaTecnicos;
  let fixture: ComponentFixture<TablaTecnicos>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TablaTecnicos],
    }).compileComponents();

    fixture = TestBed.createComponent(TablaTecnicos);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
