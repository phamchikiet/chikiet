/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { BanraComponent } from './banra.component';

describe('BanraComponent', () => {
  let component: BanraComponent;
  let fixture: ComponentFixture<BanraComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BanraComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BanraComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
