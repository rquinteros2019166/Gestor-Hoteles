import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { GLOBAL } from './global.service';
import { EventsHotel }from '../models/events.model'

@Injectable({
  providedIn: 'root'
})
export class EventService {
  public rute: String;
  public headersVariable = new HttpHeaders().set('Content-Type', 'application/json');
  public token;
  public identity;

  constructor(
    public _http: HttpClient){
      this.rute = GLOBAL.url;
     }

  listEvents(): Observable<any> {
    return this._http.get(this.rute + 'listEvents')
  }

  registeEvent(events: EventsHotel , token): Observable<any> {
    let params = JSON.stringify(events);
    let headersToken = this.headersVariable.set('Authorization',token)
    return this._http.post(this.rute + 'saveEvent',params, { headers: headersToken })
  }
}
