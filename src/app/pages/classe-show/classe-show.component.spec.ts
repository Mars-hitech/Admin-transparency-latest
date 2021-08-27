import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ClasseShowComponent } from './classe-show.component';

describe('ClasseShowComponent', () => {
  let component: ClasseShowComponent;
  let fixture: ComponentFixture<ClasseShowComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ClasseShowComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ClasseShowComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
