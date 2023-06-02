import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LexperienceComponent } from './lexperience.component';

describe('LexperienceComponent', () => {
  let component: LexperienceComponent;
  let fixture: ComponentFixture<LexperienceComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ LexperienceComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(LexperienceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
