import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PermissionRoleListComponent } from './permission-role-list.component';

describe('PermissionRoleListComponent', () => {
  let component: PermissionRoleListComponent;
  let fixture: ComponentFixture<PermissionRoleListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PermissionRoleListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PermissionRoleListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
