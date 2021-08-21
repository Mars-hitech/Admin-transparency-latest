import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RetardShowComponent } from './retard-show.component';

describe('RetardShowComponent', () => {
  let component: RetardShowComponent;
  let fixture: ComponentFixture<RetardShowComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RetardShowComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RetardShowComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
