/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { MuavaoChitietComponent } from './muavao-chitiet.component';

describe('MuavaoChitietComponent', () => {
  let component: MuavaoChitietComponent;
  let fixture: ComponentFixture<MuavaoChitietComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MuavaoChitietComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MuavaoChitietComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
