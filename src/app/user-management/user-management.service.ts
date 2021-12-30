import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { LoginService } from '../login/login.service';
//import { HttpClient } from '@angular/common/http';
import { Headers, Http, URLSearchParams, Response } from '@angular/http';
import 'rxjs/add/observable/of';
import 'rxjs/add/operator/do';
import 'rxjs/add/operator/delay';
import 'rxjs/add/operator/toPromise';

import { User } from './user';
import { Config } from '../model/config';;

@Injectable({
  providedIn: 'root'
})
export class UserManagementService {

  private headers = new Headers({ 'Content-Type': 'application/json; charset=utf-8' });
  url: string;

  constructor(
    private http: Http,
    private authService: LoginService
  ) {
    this.url = this.authService.config.baseUrl;
  }

  addUser(model: User): Promise<any> {
    let json = JSON.stringify(model);
    return this.http
      .post(this.url + '/InsertUser', json, {
        headers: this.headers
      })
      .toPromise()
      .then((response: Response) => {
        return response;
      })
      .catch(this.handleError);
  }

  updateUser(model: User): Promise<any> {
    let json = JSON.stringify(model);
    return this.http
      .post(this.url + '/EditUser', json, {
        headers: this.headers
      })
      .toPromise()
      .then((response: Response) => {
        return response;
      })
      .catch(this.handleError);
  }

  getAllUsers(): Promise<any> {
    return this.http
      .post(this.url + '/GetAllUsers', {
        headers: this.headers
      })
      .toPromise()
      .then((response: Response) => {
        return response;
      })
      .catch(this.handleError);
  }

  private handleError(error: any): Promise<any> {
    return Promise.reject(error.message || error);
  }
}
