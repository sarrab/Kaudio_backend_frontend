/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { AudiobarComponent } from './audiobar.component';

describe('AudiobarComponent', () => {
  let component: AudiobarComponent;
  let fixture: ComponentFixture<AudiobarComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AudiobarComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AudiobarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
