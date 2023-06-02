import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MatrielComponent } from './matriel.component';

describe('MatrielComponent', () => {
  let component: MatrielComponent;
  let fixture: ComponentFixture<MatrielComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MatrielComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MatrielComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
