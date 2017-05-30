import { NO_ERRORS_SCHEMA } from '@angular/core';
import { FormGroup, NgForm, FormsModule } from "@angular/forms";
import { DurationPipe } from './../../../pipes';
import { Course } from '../../../entities';
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
  let course: Course;
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
    .compileComponents();
     console.log('-------');
  }));

  /**
   * Synchronous beforeEach.
   */
  beforeEach(() => {
    fixture = TestBed.createComponent(EditCourseComponent);
    comp = fixture.componentInstance;
    comp.course = new Course(1, 'title', 'description', new Date(), 60, true, [1,2,3]);
    comp.ngOnInit();
    fixture.detectChanges();

  });

  it('should create component', () => {
      console.log('-------', comp.course, comp.editform.invalid);
    expect(comp).toBeTruthy();
  });

});
