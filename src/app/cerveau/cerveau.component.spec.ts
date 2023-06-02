import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CerveauComponent } from './cerveau.component';

describe('CerveauComponent', () => {
  let component: CerveauComponent;
  let fixture: ComponentFixture<CerveauComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CerveauComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CerveauComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
