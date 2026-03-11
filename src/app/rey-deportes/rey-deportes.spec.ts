import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ReyDeportes } from './rey-deportes';

describe('ReyDeportes', () => {
  let component: ReyDeportes;
  let fixture: ComponentFixture<ReyDeportes>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ReyDeportes]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ReyDeportes);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
