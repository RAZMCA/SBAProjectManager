import { Component, NgModule, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { CommonServiceService } from './services/common-service.service';
import { Http, Response } from '@angular/http';
import { PagerService } from './services/pageService';
import { AlertsModule } from 'angular-alert-module';
import { OrderPipe, OrderModule } from 'ngx-order-pipe';

declare var $: any;


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  providers: [PagerService]
})

@NgModule({
  declarations: [],

  imports: [OrderPipe],
  providers: [],
  bootstrap: [AppComponent]
})

export class AppComponent implements OnInit {
  constructor(private appServices: CommonServiceService, private pageService: PagerService,
    private fb: FormBuilder, private orderPipe: OrderPipe) { }
  title = 'ProjectManager';
  pager: any = {};
  pagedItems: any = [];
  page: number;
  response: any;
  search: any = {
    projSearch: '',
    taskSearch: '',
    userSearch: ''
  }

  projectkey: string = '';
  userkey: string = '';
  taskkey: string = '';
    addUserForm: FormGroup;
  myProjectForm: FormGroup;
  orderBy: boolean = false;
  isUserUpdate: boolean = false;
  filter = false;
  parentFilter = false;
  StartDate = new Date();

  accepted: any;
  Priority: any;

  public ngAfterContentInit() {

  }


  public ngOnInit() {

    this.appServices.getTaskManager();
    this.appServices.getUserDetails();
    this.appServices.getProjectDetails();
    this.appServices.getManagerDetails();

    this.myProjectForm = this.fb.group({
      ProjectId: 0,
      Project: ['', Validators.required],
      Priority: [15, Validators.required]
      
    });

    this.myForm = this.fb.group({
      TaskId: 0,
      ProjectId: [0],
      Project: [''],
      Task: ['', Validators.required]
          });

    this.addUserForm = this.fb.group({
      FirstName: ['', Validators.required],
      LastName: ['', Validators.required],
      EmployeeId: ['', Validators.required],
      UserId: 0,
      ProjectId: '',
      TaskId: '',
      IsActive: ''
    });
  };

  
  onProjectSubmit() {
    this.projSubmitted = true;
    if (this.myProjectForm.valid) {
      if (this.compareTwoDates(this.myProjectForm.value)) {
        var pId = this.myProjectForm.value.ProjectId;
        this.appServices.submitProject(this.myProjectForm.value).subscribe(data => {
          if (data) {
            alert(`Project ${pId == 0 ? 'Created' : 'Updated'} successfully...`);
            this.myProjectForm.reset();
            this.submitted = false;
            $('#save-info').prop('checked', false);
            this.onFilterChange();
            this.getProjectDetails();
          }
          else {
            alert('Oops! Something went wrong. Please try again...');
          }
        });
      }
      else {
        alert('End Date should be greater than Start Date');
      }
    }
  };

  onSubmit() {
    this.submitted = true;
    if (this.myForm.valid) {

      if (this.compareTwoDates(this.myForm.value)) {
        var tId = this.myForm.value.TaskId;
        this.appServices.submitTask(this.myForm.value).subscribe(data => {
          if (data) {
            alert(`Task ${tId == 0 ? 'Created' : 'Updated'} successfully...`);
            this.myForm.reset();
            this.submitted = false;
            this.onParentCheck();
            this.getTaskManager();
            this.getProjectDetails();
          }
          else {
            alert('Oops! Something went wrong. Please try again...');
          }
        });
      }
      else {
        alert('End Date should be greater than Start Date');
      }
    }
  };

  
  // Common function

  setPage(page: number) {
    if (this.pager.totalPages != 0) {
      if (page < 1 || page > this.pager.totalPages) {
        return;
      }
    }
    // get pager object from service
    this.pager = this.pageService.getPager(this.taskDetails.length, page);
    // get current page of items
    this.pagedItems = this.taskDetails.slice(this.pager.startIndex, this.pager.endIndex + 1);
  };


  compareTwoDates(data) {
    if (data.EndDate != null && data.EndDate != '') {
      if (new Date(data.EndDate) < new Date(data.StartDate))
        return false;

      else
        return true;
    }
    else {
      return true;
    }
  };

  
}