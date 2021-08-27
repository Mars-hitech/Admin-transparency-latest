import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TuteursListComponent } from './tuteurs-list.component';

describe('TuteursListComponent', () => {
  let component: TuteursListComponent;
  let fixture: ComponentFixture<TuteursListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TuteursListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TuteursListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
