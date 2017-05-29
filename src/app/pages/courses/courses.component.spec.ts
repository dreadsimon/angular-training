import { NO_ERRORS_SCHEMA } from '@angular/core';
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
import { OrderByPipe } from './../../pipes';
import { CourseService } from './../../services/course.service';
import { Store } from '@ngrx/store';

/**
 * Load the implementations that should be tested.
 */
import { CoursesComponent } from './courses.component';

describe(`Courses`, () => {
  let comp: CoursesComponent;
  let fixture: ComponentFixture<CoursesComponent>;

  /**
   * async beforeEach.
   */
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [CoursesComponent, OrderByPipe],
      schemas: [NO_ERRORS_SCHEMA],
      providers: [
        BaseRequestOptions,
        MockBackend,
        CourseService,
        Store,
        //SearchPipe.
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
    fixture = TestBed.createComponent(CoursesComponent);
    comp = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create component', () => {
    expect(comp).toBeTruthy();
  });

});
