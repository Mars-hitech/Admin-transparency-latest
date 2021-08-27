import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TuteursShowComponent } from './tuteurs-show.component';

describe('TuteursShowComponent', () => {
  let component: TuteursShowComponent;
  let fixture: ComponentFixture<TuteursShowComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TuteursShowComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TuteursShowComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
