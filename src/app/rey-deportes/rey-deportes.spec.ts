import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ReyDeportesComponent } from './rey-deportes';

describe('ReyDeportesComponent', () => {
  let component: ReyDeportesComponent;
  let fixture: ComponentFixture<ReyDeportesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ReyDeportesComponent] // correcto porque es standalone
    })
    .compileComponents();

    fixture = TestBed.createComponent(ReyDeportesComponent);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});