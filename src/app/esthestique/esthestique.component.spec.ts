import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EsthestiqueComponent } from './esthestique.component';

describe('EsthestiqueComponent', () => {
  let component: EsthestiqueComponent;
  let fixture: ComponentFixture<EsthestiqueComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EsthestiqueComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EsthestiqueComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
