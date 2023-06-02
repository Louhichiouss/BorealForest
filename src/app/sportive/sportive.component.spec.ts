import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SportiveComponent } from './sportive.component';

describe('SportiveComponent', () => {
  let component: SportiveComponent;
  let fixture: ComponentFixture<SportiveComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SportiveComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SportiveComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
