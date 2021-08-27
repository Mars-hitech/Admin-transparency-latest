import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MessageShowComponent } from './message-show.component';

describe('MessageShowComponent', () => {
  let component: MessageShowComponent;
  let fixture: ComponentFixture<MessageShowComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MessageShowComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MessageShowComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
