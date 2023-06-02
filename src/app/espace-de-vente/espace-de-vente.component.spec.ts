import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EspaceDeVenteComponent } from './espace-de-vente.component';

describe('EspaceDeVenteComponent', () => {
  let component: EspaceDeVenteComponent;
  let fixture: ComponentFixture<EspaceDeVenteComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EspaceDeVenteComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EspaceDeVenteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
