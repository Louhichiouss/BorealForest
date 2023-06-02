import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LaGestionDeLaDouleurComponent } from './la-gestion-de-la-douleur.component';

describe('LaGestionDeLaDouleurComponent', () => {
  let component: LaGestionDeLaDouleurComponent;
  let fixture: ComponentFixture<LaGestionDeLaDouleurComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ LaGestionDeLaDouleurComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(LaGestionDeLaDouleurComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
