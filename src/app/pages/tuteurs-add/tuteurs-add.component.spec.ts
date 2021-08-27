import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TuteursAddComponent } from './tuteurs-add.component';

describe('TuteursAddComponent', () => {
  let component: TuteursAddComponent;
  let fixture: ComponentFixture<TuteursAddComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TuteursAddComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TuteursAddComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
