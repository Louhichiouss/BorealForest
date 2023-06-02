import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MigrainesComponent } from './migraines.component';

describe('MigrainesComponent', () => {
  let component: MigrainesComponent;
  let fixture: ComponentFixture<MigrainesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MigrainesComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MigrainesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
