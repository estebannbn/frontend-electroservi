import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ClientesDasbhoard } from './clientes-dasbhoard';

describe('ClientesDasbhoard', () => {
  let component: ClientesDasbhoard;
  let fixture: ComponentFixture<ClientesDasbhoard>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ClientesDasbhoard],
    }).compileComponents();

    fixture = TestBed.createComponent(ClientesDasbhoard);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
