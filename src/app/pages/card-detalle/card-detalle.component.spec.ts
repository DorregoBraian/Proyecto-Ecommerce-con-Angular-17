import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CardDetalleComponent } from './card-detalle.component';

describe('CardDetalleComponent', () => {
  let component: CardDetalleComponent;
  let fixture: ComponentFixture<CardDetalleComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CardDetalleComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CardDetalleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
