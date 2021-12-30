import { Injectable } from '@angular/core';
import { Response, RequestOptions, ResponseContentType, Http, Headers } from '@angular/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { NgForm, FormControl, Validators, FormGroup, FormBuilder } from '@angular/forms';
import { LoginService } from '../login/login.service';

@Injectable({
  providedIn: 'root'
})
export class UploadFileService {

  url: string;
  url2: string;

  private headers = new Headers({ 'Content-Type': 'application/json' });
  private head = new Headers({ 'Content-Type': 'application/json' });
  constructor(
    private http: Http,
    private authService: LoginService
  ) {
    this.url = this.authService.config.baseUrl;
    this.url2 = this.authService.config.baseUrl2;
  }

  uploadFile(formData: FormData): Observable<Response> {
    let xhr: XMLHttpRequest = new XMLHttpRequest();

    this.head.append("Accept", 'application/json');
    this.head.delete("Content-Type");

    return this.http.post(this.url2 + '/UploadCustomerFile', formData, { headers: this.head }).pipe(map(res => res.json()));
  }
}
