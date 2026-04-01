import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MenuTecnicos } from './menu-tecnicos';

describe('MenuTecnicos', () => {
  let component: MenuTecnicos;
  let fixture: ComponentFixture<MenuTecnicos>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MenuTecnicos],
    }).compileComponents();

    fixture = TestBed.createComponent(MenuTecnicos);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
