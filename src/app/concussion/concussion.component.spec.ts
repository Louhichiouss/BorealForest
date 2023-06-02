import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ConcussionComponent } from './concussion.component';

describe('ConcussionComponent', () => {
  let component: ConcussionComponent;
  let fixture: ComponentFixture<ConcussionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ConcussionComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ConcussionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
