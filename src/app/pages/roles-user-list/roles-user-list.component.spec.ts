import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RolesUserListComponent } from './roles-user-list.component';

describe('RolesUserListComponent', () => {
  let component: RolesUserListComponent;
  let fixture: ComponentFixture<RolesUserListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RolesUserListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RolesUserListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
