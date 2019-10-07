import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CombinadoPage } from './combinado.page';

describe('CombinadoPage', () => {
  let component: CombinadoPage;
  let fixture: ComponentFixture<CombinadoPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CombinadoPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CombinadoPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
