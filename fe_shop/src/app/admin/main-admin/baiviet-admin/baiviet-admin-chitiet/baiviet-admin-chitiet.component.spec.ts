/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { BaivietAdminChitietComponent } from './baiviet-admin-chitiet.component';

describe('BaivietAdminChitietComponent', () => {
  let component: BaivietAdminChitietComponent;
  let fixture: ComponentFixture<BaivietAdminChitietComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BaivietAdminChitietComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BaivietAdminChitietComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
