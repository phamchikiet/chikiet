/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { NhapkhoComponent } from './nhapkho.component';

describe('NhapkhoComponent', () => {
  let component: NhapkhoComponent;
  let fixture: ComponentFixture<NhapkhoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NhapkhoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NhapkhoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
