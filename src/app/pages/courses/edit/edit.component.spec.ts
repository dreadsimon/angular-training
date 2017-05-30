import { NO_ERRORS_SCHEMA } from '@angular/core';
import { FormGroup, NgForm } from "@angular/forms";
import { FormsModule } from '@angular/forms';
import { DurationPipe } from './../../../pipes';
import {
  inject,
  async,
  TestBed,
  ComponentFixture
} from '@angular/core/testing';
import { Component } from '@angular/core';
import {
  BaseRequestOptions,
  ConnectionBackend,
  Http
} from '@angular/http';
import { MockBackend } from '@angular/http/testing';

/**
 * Load the implementations that should be tested.
 */
import { EditCourseComponent } from './edit.component';

describe(`Courses`, () => {
  let comp: EditCourseComponent;
  let fixture: ComponentFixture<EditCourseComponent>;

  /**
   * async beforeEach.
   */
  beforeEach(async(() => {
    TestBed.configureTestingModule({
        imports: [FormsModule ],
      declarations: [EditCourseComponent,DurationPipe],
      schemas: [NO_ERRORS_SCHEMA],
      providers: [
        BaseRequestOptions,
        MockBackend,
        {
          provide: Http,
          useFactory: (backend: ConnectionBackend, defaultOptions: BaseRequestOptions) => {
            return new Http(backend, defaultOptions);
          },
          deps: [MockBackend, BaseRequestOptions]
        }
      ]
    })
    /**
     * Compile template and css.
     */
    .compileComponents();
  }));

  /**
   * Synchronous beforeEach.
   */
  beforeEach(() => {
    fixture = TestBed.createComponent(EditCourseComponent);
    comp = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create component', () => {
    expect(comp).toBeTruthy();
  });

});
