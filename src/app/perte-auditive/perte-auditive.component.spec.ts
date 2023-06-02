import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PerteAuditiveComponent } from './perte-auditive.component';

describe('PerteAuditiveComponent', () => {
  let component: PerteAuditiveComponent;
  let fixture: ComponentFixture<PerteAuditiveComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PerteAuditiveComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PerteAuditiveComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
