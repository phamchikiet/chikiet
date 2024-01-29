/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { XNTComponent } from './XNT.component';

describe('XNTComponent', () => {
  let component: XNTComponent;
  let fixture: ComponentFixture<XNTComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ XNTComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(XNTComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
