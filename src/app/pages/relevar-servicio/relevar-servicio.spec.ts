import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RelevarServicio } from './relevar-servicio';

describe('RelevarServicio', () => {
  let component: RelevarServicio;
  let fixture: ComponentFixture<RelevarServicio>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RelevarServicio],
    }).compileComponents();

    fixture = TestBed.createComponent(RelevarServicio);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
