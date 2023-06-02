import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DevloppementMoteurComponent } from './devloppement-moteur.component';

describe('DevloppementMoteurComponent', () => {
  let component: DevloppementMoteurComponent;
  let fixture: ComponentFixture<DevloppementMoteurComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DevloppementMoteurComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DevloppementMoteurComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
