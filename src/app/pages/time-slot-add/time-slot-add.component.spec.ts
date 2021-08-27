import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TimeSlotAddComponent } from './time-slot-add.component';

describe('TimeSlotAddComponent', () => {
  let component: TimeSlotAddComponent;
  let fixture: ComponentFixture<TimeSlotAddComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TimeSlotAddComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TimeSlotAddComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
