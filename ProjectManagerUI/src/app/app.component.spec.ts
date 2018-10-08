import { TestBed, async, ComponentFixture, inject  } from '@angular/core/testing';
import { HttpClientModule } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { RouterTestingModule } from '@angular/router/testing'
import { AppComponent } from './app.component';
import { Component, NgModule, OnInit, NO_ERRORS_SCHEMA } from '@angular/core';
import { FormsModule,ReactiveFormsModule, FormGroup, FormBuilder, Validators } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { CommonServiceService } from './services/common-service.service';
import { FilterPipe } from './pipes/filter.pipe';
import { PagerService } from './services/pageService';
import { AlertsModule } from 'angular-alert-module';
import { Observable, of } from 'rxjs';
import { OrderPipe, OrderModule } from 'ngx-order-pipe';

describe('AppComponent', () => {

  let component: AppComponent;
  let fixture: ComponentFixture<AppComponent>;

  const parentTaskDetail: any = [
    {
      "ParentTask": "Parent A",
      "ParentId": 1
     
    },
    {
      "ParentTask": "Parent B",
      "ParentId": 2
     
    },
    {
     "ParentTask": "Parent C",
      "ParentId": 3
     
    }
  ];
  

  const taskDetail: any = [
    {
      "TaskId": 0,
      "ParentTask": 2,
      "Task": "Test A",
      "StartDate": "09/19/2018",
      "EndDate": "09/19/2018",
      "Priority": 10
    },
    {
      "TaskId": 0,
      "ParentTask": 2,
      "Task": "Test B",
      "StartDate": "09/17/2018",
      "EndDate": "09/18/2018",
      "Priority": 20
    },
    {
      "TaskId": 0,
      "ParentTask": 2,
      "Task": "Test C",
      "StartDate": "09/18/2018",
      "EndDate": "09/20/2018",
      "Priority": 30
    }
  ];

  const projDetails: any = [
    {
      "ProjectId": 0,
      "Project": "Karma Project 1",
      "Priority": 20,
      "StartDate": "09/19/2018",
      "EndDate": "09/19/2018",
      "ManagerId": "EMP100"
    },
    {
      "ProjectId": 0,
      "Project": "Karma Project 2",
      "Priority": 15,
      "StartDate": "09/19/2018",
      "EndDate": "09/19/2018",
      "ManagerId": "EMP101"
    },
    {
      "ProjectId": 0,
      "Project": "Karma Project 3",
      "Priority": 10,
      "StartDate": "09/19/2018",
      "EndDate": "09/19/2018",
      "ManagerId": "EMP102"
    }
  ];

  const managerDetails: any = [
    {
      "FirstName": "Karma FName 1",
      "LastName": "Karma LName 1",
      "EmployeeId": "KAR001",
      "UserId": 0,
      "ProjectId": 0,
      "TaskId": 0
    },
    {
      "FirstName": "Karma FName 2",
      "LastName": "Karma LName 2",
      "EmployeeId": "KAR002",
      "UserId": 0,
      "ProjectId": 0,
      "TaskId": 0
    },
    {
      "FirstName": "Karma FName 3",
      "LastName": "Karma LName 3",
      "EmployeeId": "KAR003",
      "UserId": 0,
      "ProjectId": 0,
      "TaskId": 0
    }
  ];

  const userDetails: any = [
    {
      "FirstName": "Karma FName 1",
      "LastName": "Karma LName 1",
      "EmployeeId": "KAR001",
      "UserId": 0,
      "ProjectId": 0,
      "TaskId": 0
    },
    {
      "FirstName": "Karma FName 2",
      "LastName": "Karma LName 2",
      "EmployeeId": "KAR002",
      "UserId": 0,
      "ProjectId": 0,
      "TaskId": 0
    },
    {
      "FirstName": "Karma FName 3",
      "LastName": "Karma LName 3",
      "EmployeeId": "KAR003",
      "UserId": 0,
      "ProjectId": 0,
      "TaskId": 0
    }
  ];


  let mockService = {
    getParentTask(): Observable<any> {
      return of(parentTaskDetail);
    },

    getTaskManager(): Observable<any> {
      return of(taskDetail);
    },

    submitTask(task): Observable<any> {
      taskDetail.unshift(task);
      return of(task);
    },

    updateEndTask(task): Observable<any> {
      let idx = taskDetail.findIndex(x => x.TaskId == task.TaskId);
      if (idx !== -1) {
        taskDetail[idx] = task;
      }
      return of(task);
    },

    getProjectDetails(): Observable<any> {
      return of(projDetails);
    },

    getManagerDetails(): Observable<any> {
      return of(managerDetails);
    },

    getUserDetails(): Observable<any> {
      return of(userDetails);
    },
  }

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [
        AppComponent, FilterPipe
      ],
      schemas: [NO_ERRORS_SCHEMA],
      imports: [HttpClientModule, RouterTestingModule, BrowserAnimationsModule, FormsModule, AlertsModule,ReactiveFormsModule],
      providers: [{ provide: CommonServiceService, useValue: mockService }, PagerService, OrderPipe]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AppComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });
  it('should create the app', async(() => {
     expect(component).toBeTruthy();
  }));

   it('should be get', inject([CommonServiceService], (service: CommonServiceService) => {
    service.getParentTask().subscribe(data => {component.parentTaskList = data;});
    fixture.detectChanges();
    expect(service).toBeTruthy();
  }));

   it('should be get', inject([CommonServiceService], (service: CommonServiceService) => {
    service.getTaskManager().subscribe(data => {component.pagedItems = data;});
    fixture.detectChanges();
    expect(service).toBeTruthy();
  }));

  it('should be get', inject([CommonServiceService], (service: CommonServiceService) => {
    service.getProjectDetails().subscribe(data => {component.projDetails = data;});
    fixture.detectChanges();
    expect(service).toBeTruthy();
  }));

  it('should be get', inject([CommonServiceService], (service: CommonServiceService) => {
    service.getManagerDetails().subscribe(data => {component.managerDetails = data;});
    fixture.detectChanges();
    expect(service).toBeTruthy();
  }));

  it('should be get', inject([CommonServiceService], (service: CommonServiceService) => {
    service.getUserDetails().subscribe(data => {component.userDetails = data;});
    fixture.detectChanges();
    expect(service).toBeTruthy();
  }));
    
});
