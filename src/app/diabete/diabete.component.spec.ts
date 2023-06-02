import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DiabeteComponent } from './diabete.component';

describe('DiabeteComponent', () => {
  let component: DiabeteComponent;
  let fixture: ComponentFixture<DiabeteComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DiabeteComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DiabeteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
