import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ChatUserShowComponent } from './chat-user-show.component';

describe('ChatUserShowComponent', () => {
  let component: ChatUserShowComponent;
  let fixture: ComponentFixture<ChatUserShowComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ChatUserShowComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ChatUserShowComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
