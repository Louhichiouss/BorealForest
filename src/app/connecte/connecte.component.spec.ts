import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ConnecteComponent } from './connecte.component';

describe('ConnecteComponent', () => {
  let component: ConnecteComponent;
  let fixture: ComponentFixture<ConnecteComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ConnecteComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ConnecteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
