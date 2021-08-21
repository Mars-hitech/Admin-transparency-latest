import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { InscritShowComponent } from './inscrit-show.component';

describe('InscritShowComponent', () => {
  let component: InscritShowComponent;
  let fixture: ComponentFixture<InscritShowComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ InscritShowComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(InscritShowComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
