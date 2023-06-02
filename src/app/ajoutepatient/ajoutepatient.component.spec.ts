import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AjoutepatientComponent } from './ajoutepatient.component';

describe('AjoutepatientComponent', () => {
  let component: AjoutepatientComponent;
  let fixture: ComponentFixture<AjoutepatientComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AjoutepatientComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AjoutepatientComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
