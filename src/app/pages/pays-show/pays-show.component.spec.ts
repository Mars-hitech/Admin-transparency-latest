import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PaysShowComponent } from './pays-show.component';

describe('PaysShowComponent', () => {
  let component: PaysShowComponent;
  let fixture: ComponentFixture<PaysShowComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PaysShowComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PaysShowComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
