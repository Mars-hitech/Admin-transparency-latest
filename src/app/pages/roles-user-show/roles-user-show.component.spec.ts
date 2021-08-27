import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RolesUserShowComponent } from './roles-user-show.component';

describe('RolesUserShowComponent', () => {
  let component: RolesUserShowComponent;
  let fixture: ComponentFixture<RolesUserShowComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RolesUserShowComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RolesUserShowComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
