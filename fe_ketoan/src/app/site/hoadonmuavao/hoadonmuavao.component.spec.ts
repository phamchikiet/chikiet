/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { HoadonmuavaoComponent } from './hoadonmuavao.component';

describe('HoadonmuavaoComponent', () => {
  let component: HoadonmuavaoComponent;
  let fixture: ComponentFixture<HoadonmuavaoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ HoadonmuavaoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HoadonmuavaoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
