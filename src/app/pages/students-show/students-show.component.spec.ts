import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { StudentsShowComponent } from './students-show.component';

describe('StudentsShowComponent', () => {
  let component: StudentsShowComponent;
  let fixture: ComponentFixture<StudentsShowComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ StudentsShowComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(StudentsShowComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
