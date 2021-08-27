import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { VilleAddComponent } from './ville-add.component';

describe('VilleAddComponent', () => {
  let component: VilleAddComponent;
  let fixture: ComponentFixture<VilleAddComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ VilleAddComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(VilleAddComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
