import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SommeilEnergieComponent } from './sommeil-energie.component';

describe('SommeilEnergieComponent', () => {
  let component: SommeilEnergieComponent;
  let fixture: ComponentFixture<SommeilEnergieComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SommeilEnergieComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SommeilEnergieComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
