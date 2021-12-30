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

import { Data } from './data';
import { UserComments } from './user-comments';
import { Config } from '../model/config';

@Injectable({
  providedIn: 'root'
})
export class SearchDataService {

  private headers = new Headers({ 'Content-Type': 'application/json; charset=utf-8' });
  url: string;

  constructor(
    private http: Http,
    private authService: LoginService
  ) {
    this.url = this.authService.config.baseUrl;
  }

  getAllData(ListingID: string, username: string, role: string): Promise<any> {
    let json = JSON.stringify({ 'ListingID': ListingID, 'username': username, 'Role': role });
    return this.http
      .post(this.url + '/GetListingDetails', json, {
        headers: this.headers
      })
      .toPromise()
      .then((response: Response) => {
        return response;
      })
      .catch(this.handleError);
  }

  getFsboCommentList(): Promise<any> {
    return this.http
      .post(this.url + '/getFSBOListWithUserComments', {
        headers: this.headers
      })
      .toPromise()
      .then((response: Response) => {
        return response;
      })
      .catch(this.handleError);
  }

  deleteFsboListing(ListingID: string): Promise<any> {
    let json = JSON.stringify({ 'ListingID': ListingID });
    return this.http
      .post(this.url + '/DeleteListing', json, {
        headers: this.headers
      })
      .toPromise()
      .then((response: Response) => {
        return response;
      })
      .catch(this.handleError);
  }

  getCustomerData(model: Data): Promise<any> {
    let json = JSON.stringify(model);
    return this.http
      .post(this.url + '/getFSBOList', json, {
        headers: this.headers
      })
      .toPromise()
      .then((response: Response) => {
        return response;
      })
      .catch(this.handleError);
  }

  updateCustomerData(model: Data): Promise<any> {
    let json = JSON.stringify(model);
    return this.http
      .post(this.url + '/UpdateFSBOList', json, {
        headers: this.headers
      })
      .toPromise()
      .then((response: Response) => {
        return response;
      })
      .catch(this.handleError);
  }

  getUserComments(ListingID: string,): Promise<any> {
    let json = JSON.stringify({ 'ListingID': ListingID});
    return this.http
      .post(this.url + '/getUserComments', json, {
        headers: this.headers
      })
      .toPromise()
      .then((response: Response) => {
        return response;
      })
      .catch(this.handleError);
  } 

  canViewListing(ListingID: string, Username: String): Promise<any> {
    let json = JSON.stringify({ 'ListingID': ListingID, 'Username': Username });
    return this.http
      .post(this.url + '/canViewListing', json, {
        headers: this.headers
      })
      .toPromise()
      .then((response: Response) => {
        return response;
      })
      .catch(this.handleError);
  }

  updateUserComment(model: UserComments): Promise<any> {
    let json = JSON.stringify(model);
    return this.http
      .post(this.url + '/UpdateUserComments', json, {
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
