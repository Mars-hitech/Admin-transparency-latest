import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SchoolShowComponent } from './school-show.component';

describe('SchoolShowComponent', () => {
  let component: SchoolShowComponent;
  let fixture: ComponentFixture<SchoolShowComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SchoolShowComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SchoolShowComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
