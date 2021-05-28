import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { User } from '../models/user.model';
import { GLOBAL } from './global.service';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  public rute: String;
  public token;
  public indentity;
  public headersVariable = new HttpHeaders().set('Content-Type', 'application/json');
  constructor(public _http: HttpClient) {
    this.rute = GLOBAL.url;
  }

  register(user: User): Observable<any> {
    let params = JSON.stringify(user);
    return this._http.post(this.rute + 'saveUser', params, { headers: this.headersVariable })
  }

  login(user, getToken = null): Observable<any> {
    if (getToken != null) {
      user.getToken = getToken
    }
    let params = JSON.stringify(user);
    return this._http.post(this.rute + 'login', params, { headers: this.headersVariable })
  }

  getToken() {
    var token2 = localStorage.getItem('token');
    if (token2 != 'undefined') {
      this.token = token2;
    } else {
      this.token = null;
    }
    return this.token;
  }

  getIdentity() {
    var identity2 = JSON.parse(localStorage.getItem('identity'));
    if (identity2 != 'undefined') {
      this.indentity = identity2;
    } else {
      this.indentity = null;
    }
    return this.indentity;
  }

  editUser(user: User): Observable<any> {
    let params = JSON.stringify(user);
    let headersToken = this.headersVariable.set('Authorization', this.getToken())
    return this._http.put(this.rute + 'editUser/' + user._id, params, { headers: headersToken })
  }

  getUser(id: String): Observable<any> {
    return this._http.get(this.rute + 'getUserId/' + id, { headers: this.headersVariable })
  }

  deleteUser(id: String): Observable<any> {
    let headersToken = this.headersVariable.set('Authorization', this.getToken());
    return this._http.delete(this.rute + 'deleteUser/' + id, { headers: headersToken })
  }

  getUsers(): Observable<any> {
    return this._http.get(this.rute + 'getUsers', { headers: this.headersVariable })
  }

  editUserAdmin(user: User):Observable<any>{
    let params = JSON.stringify(user);
    let headersToken = this.headersVariable.set('Authorization',this.getToken())

    return this._http.put(this.rute + 'editUserAdmin/'+user._id,params,{headers: headersToken})
  }

}
