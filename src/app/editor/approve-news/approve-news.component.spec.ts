import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ApproveNewsComponent } from './approve-news.component';

describe('ApproveNewsComponent', () => {
  let component: ApproveNewsComponent;
  let fixture: ComponentFixture<ApproveNewsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ApproveNewsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ApproveNewsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
