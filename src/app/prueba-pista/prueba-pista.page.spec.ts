import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PruebaPistaPage } from './prueba-pista.page';

describe('PruebaPistaPage', () => {
  let component: PruebaPistaPage;
  let fixture: ComponentFixture<PruebaPistaPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PruebaPistaPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PruebaPistaPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
