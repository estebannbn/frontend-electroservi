import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListaServiciosComponent } from './lista-servicios-component';

describe('ListaServiciosComponent', () => {
  let component: ListaServiciosComponent;
  let fixture: ComponentFixture<ListaServiciosComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ListaServiciosComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(ListaServiciosComponent);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
