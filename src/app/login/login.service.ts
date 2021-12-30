import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
//import { HttpClient } from '@angular/common/http';
import { Headers, Http, URLSearchParams, Response } from '@angular/http';
import 'rxjs/add/observable/of';
import 'rxjs/add/operator/do';
import 'rxjs/add/operator/delay';
import 'rxjs/add/operator/toPromise';

import { Login } from '../login/login';
import { Config } from '../model/config';

@Injectable({
  providedIn: 'root'
})
export class LoginService {

   
    //private headers = new Headers({ 'Content-Type': 'application/x-www-form-urlencoded' });
    private headers = new Headers({ 'Content-Type': 'application/json; charset=utf-8' });
    public config: Config;
	
    isLoggedIn = false;
    redirectUrl: string;
    session_id: string;
    repo_id: string;

    constructor(private http: Http) {
      this.config = new Config();
      this.config.baseUrl = '/CommonService.asmx';
      this.config.baseUrl2 = '/UploadService.asmx';
    }

    login(model: Login): Promise<any> {
      let json = JSON.stringify(model);
      return this.http
        .post(this.config.baseUrl + '/Login', json, {
          headers: this.headers
        })
        .toPromise()
        .then((response: Response) => {
          this.isLoggedIn = true;
          return response;
        })
        .catch(this.handleError);
    }

    changePassword(model: Login): Promise<any> {
      let json = JSON.stringify(model);
      return this.http
        .post(this.config.baseUrl + '/changePassword', json, {
          headers: this.headers
        })
        .toPromise()
        .then((response: Response) => {
          this.isLoggedIn = true;
          return response;
        })
        .catch(this.handleError);
    }

    getUserProfile(username): Promise<any> {
      let json = JSON.stringify({ 'username': username });
      return this.http
        .post(this.config.baseUrl + '/GetUserByUsername', json, {
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
