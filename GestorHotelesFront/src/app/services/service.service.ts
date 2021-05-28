import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Service } from '../models/service.model';
import { GLOBAL } from './global.service';

@Injectable({
  providedIn: 'root'
})
export class ServiceService {
  public rute: String;
  public headersVariable = new HttpHeaders().set('Content-Type', 'application/json');
  public token;
  public identity;

  constructor(
    public _http: HttpClient
  ) { this.rute = GLOBAL.url }

  listService(): Observable<any> {
    return this._http.get(this.rute + 'listServices')
  }

  registerService(service: Service , token): Observable<any> {
    let params = JSON.stringify(service);
    let headersToken = this.headersVariable.set('Authorization',token)
    return this._http.post(this.rute + 'addService',params, { headers: headersToken })
  }

  getServiceId(id : String):Observable<any> {
    return this._http.get(this.rute + 'listServiceId/'+id,{headers: this.headersVariable})
  }
}
