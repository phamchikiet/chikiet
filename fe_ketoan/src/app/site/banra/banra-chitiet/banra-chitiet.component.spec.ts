/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { BanraChitietComponent } from './banra-chitiet.component';

describe('BanraChitietComponent', () => {
  let component: BanraChitietComponent;
  let fixture: ComponentFixture<BanraChitietComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BanraChitietComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BanraChitietComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
