import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AutistesComponent } from './autistes.component';

describe('AutistesComponent', () => {
  let component: AutistesComponent;
  let fixture: ComponentFixture<AutistesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AutistesComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AutistesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
