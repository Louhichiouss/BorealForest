import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LesCapaciteCognitivesComponent } from './les-capacite-cognitives.component';

describe('LesCapaciteCognitivesComponent', () => {
  let component: LesCapaciteCognitivesComponent;
  let fixture: ComponentFixture<LesCapaciteCognitivesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ LesCapaciteCognitivesComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(LesCapaciteCognitivesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
