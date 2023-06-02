import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PrincpeDeBaseComponent } from './princpe-de-base.component';

describe('PrincpeDeBaseComponent', () => {
  let component: PrincpeDeBaseComponent;
  let fixture: ComponentFixture<PrincpeDeBaseComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PrincpeDeBaseComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PrincpeDeBaseComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
