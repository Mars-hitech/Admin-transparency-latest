import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { VilleShowComponent } from './ville-show.component';

describe('VilleShowComponent', () => {
  let component: VilleShowComponent;
  let fixture: ComponentFixture<VilleShowComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ VilleShowComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(VilleShowComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
