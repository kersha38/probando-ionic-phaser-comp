import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ReglaTresPage } from './regla-tres.page';

describe('ReglaTresPage', () => {
  let component: ReglaTresPage;
  let fixture: ComponentFixture<ReglaTresPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ReglaTresPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ReglaTresPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
