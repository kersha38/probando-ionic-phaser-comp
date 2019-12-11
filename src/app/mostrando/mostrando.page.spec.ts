import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MostrandoPage } from './mostrando.page';

describe('MostrandoPage', () => {
  let component: MostrandoPage;
  let fixture: ComponentFixture<MostrandoPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MostrandoPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MostrandoPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
