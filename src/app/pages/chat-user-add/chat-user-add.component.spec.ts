import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ChatUserAddComponent } from './chat-user-add.component';

describe('ChatUserAddComponent', () => {
  let component: ChatUserAddComponent;
  let fixture: ComponentFixture<ChatUserAddComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ChatUserAddComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ChatUserAddComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
