import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ChirurgiComponent } from './chirurgi.component';

describe('ChirurgiComponent', () => {
  let component: ChirurgiComponent;
  let fixture: ComponentFixture<ChirurgiComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ChirurgiComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ChirurgiComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
