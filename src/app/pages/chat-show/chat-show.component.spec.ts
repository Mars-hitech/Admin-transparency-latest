import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ChatShowComponent } from './chat-show.component';

describe('ChatShowComponent', () => {
  let component: ChatShowComponent;
  let fixture: ComponentFixture<ChatShowComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ChatShowComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ChatShowComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
