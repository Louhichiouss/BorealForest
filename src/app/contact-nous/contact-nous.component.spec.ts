import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ContactNousComponent } from './contact-nous.component';

describe('ContactNousComponent', () => {
  let component: ContactNousComponent;
  let fixture: ComponentFixture<ContactNousComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ContactNousComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ContactNousComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
