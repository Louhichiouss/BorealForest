import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FertiliteComponent } from './fertilite.component';

describe('FertiliteComponent', () => {
  let component: FertiliteComponent;
  let fixture: ComponentFixture<FertiliteComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FertiliteComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FertiliteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
