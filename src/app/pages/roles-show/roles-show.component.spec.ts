import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RolesShowComponent } from './roles-show.component';

describe('RolesShowComponent', () => {
  let component: RolesShowComponent;
  let fixture: ComponentFixture<RolesShowComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RolesShowComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RolesShowComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
