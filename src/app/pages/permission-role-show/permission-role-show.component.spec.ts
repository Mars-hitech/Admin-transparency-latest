import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PermissionRoleShowComponent } from './permission-role-show.component';

describe('PermissionRoleShowComponent', () => {
  let component: PermissionRoleShowComponent;
  let fixture: ComponentFixture<PermissionRoleShowComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PermissionRoleShowComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PermissionRoleShowComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
