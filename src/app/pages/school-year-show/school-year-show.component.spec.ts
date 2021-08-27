import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SchoolYearShowComponent } from './school-year-show.component';

describe('SchoolYearShowComponent', () => {
  let component: SchoolYearShowComponent;
  let fixture: ComponentFixture<SchoolYearShowComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SchoolYearShowComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SchoolYearShowComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
