import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PersonneShowComponent } from './personne-show.component';

describe('PersonneShowComponent', () => {
  let component: PersonneShowComponent;
  let fixture: ComponentFixture<PersonneShowComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PersonneShowComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PersonneShowComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
