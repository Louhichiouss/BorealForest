import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DevloppementDeParaoleComponent } from './devloppement-de-paraole.component';

describe('DevloppementDeParaoleComponent', () => {
  let component: DevloppementDeParaoleComponent;
  let fixture: ComponentFixture<DevloppementDeParaoleComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DevloppementDeParaoleComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DevloppementDeParaoleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
