/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { XuatnhaptonComponent } from './xuatnhapton.component';

describe('XuatnhaptonComponent', () => {
  let component: XuatnhaptonComponent;
  let fixture: ComponentFixture<XuatnhaptonComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ XuatnhaptonComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(XuatnhaptonComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
