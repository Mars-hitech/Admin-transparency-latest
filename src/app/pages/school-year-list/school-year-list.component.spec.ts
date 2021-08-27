import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SchoolYearListComponent } from './school-year-list.component';

describe('SchoolYearListComponent', () => {
  let component: SchoolYearListComponent;
  let fixture: ComponentFixture<SchoolYearListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SchoolYearListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SchoolYearListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
