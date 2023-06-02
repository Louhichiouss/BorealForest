import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PinterfaceComponent } from './pinterface.component';

describe('PinterfaceComponent', () => {
  let component: PinterfaceComponent;
  let fixture: ComponentFixture<PinterfaceComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PinterfaceComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PinterfaceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
