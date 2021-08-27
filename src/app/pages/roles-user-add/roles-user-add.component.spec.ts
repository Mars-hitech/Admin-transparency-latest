import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RolesUserAddComponent } from './roles-user-add.component';

describe('RolesUserAddComponent', () => {
  let component: RolesUserAddComponent;
  let fixture: ComponentFixture<RolesUserAddComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RolesUserAddComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RolesUserAddComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
