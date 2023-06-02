import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ChronicPainComponent } from './chronic-pain.component';

describe('ChronicPainComponent', () => {
  let component: ChronicPainComponent;
  let fixture: ComponentFixture<ChronicPainComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ChronicPainComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ChronicPainComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
