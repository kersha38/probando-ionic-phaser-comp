import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { GrillasMenuPage } from './grillas-menu.page';

describe('GrillasMenuPage', () => {
  let component: GrillasMenuPage;
  let fixture: ComponentFixture<GrillasMenuPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ GrillasMenuPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GrillasMenuPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
