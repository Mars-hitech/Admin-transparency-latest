import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TimeSlotShowComponent } from './time-slot-show.component';

describe('TimeSlotShowComponent', () => {
  let component: TimeSlotShowComponent;
  let fixture: ComponentFixture<TimeSlotShowComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TimeSlotShowComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TimeSlotShowComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
