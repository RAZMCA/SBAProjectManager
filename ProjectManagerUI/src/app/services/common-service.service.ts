import { Component, NgModule, Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';


var apiURL = "http://localhost:4040/";
//var apiURL = "http://localhost:33424//";

const httpOptions = {
  headers: new HttpHeaders({
    'Content-Type': 'application/json'
  })
};


@Injectable({
  providedIn: 'root'
})

export class CommonServiceService {

  constructor(public http: HttpClient) { }

  getParentTask() {
    return this.http.get(apiURL + "api/ProjectManager/Task/Parent");
  }

  getTaskManager() {
    return this.http.get(apiURL + "api/ProjectManager/Task/All");
  }

  submitTask(task) {
    return this.http.post(apiURL + "api/ProjectManager/Task/AddUpdate", task, httpOptions);
  }

  updateEndTask(task) {
    return this.http.post(apiURL + "api/ProjectManager/Task/End", task);
  }

  getProjectDetails() {
    return this.http.get(apiURL + "api/ProjectManager/Project/All");
  }

  
  submitProject(project) {
    return this.http.post(apiURL + "api/ProjectManager/Project/AddUpdate", project, httpOptions);
  }

  suspendProject(project) {
    return this.http.post(apiURL + "api/ProjectManager/Project/Suspend", project, httpOptions);
  }

  getManagerDetails() {
    return this.http.get(apiURL + "api/ProjectManager/User/All");
  }

  getUserDetails() {
    return this.http.get(apiURL + "api/ProjectManager/User/All");
  }

  submitUser(user) {
    return this.http.post(apiURL + "api/ProjectManager/User/AddUpdate", user, httpOptions);
  }

  deleteUser(user) {
    return this.http.post(apiURL + "api/ProjectManager/User/Delete", user, httpOptions);
  }
}
