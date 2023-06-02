import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BorealForestComponent } from './boreal-forest.component';

describe('BorealForestComponent', () => {
  let component: BorealForestComponent;
  let fixture: ComponentFixture<BorealForestComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BorealForestComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(BorealForestComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
