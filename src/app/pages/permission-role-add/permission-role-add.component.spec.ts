import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PermissionRoleAddComponent } from './permission-role-add.component';

describe('PermissionRoleAddComponent', () => {
  let component: PermissionRoleAddComponent;
  let fixture: ComponentFixture<PermissionRoleAddComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PermissionRoleAddComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PermissionRoleAddComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
