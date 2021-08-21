import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AbsentsShowComponent } from './absents-show.component';

describe('AbsentsShowComponent', () => {
  let component: AbsentsShowComponent;
  let fixture: ComponentFixture<AbsentsShowComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AbsentsShowComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AbsentsShowComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
