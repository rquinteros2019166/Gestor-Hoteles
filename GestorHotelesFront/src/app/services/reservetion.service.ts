import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Reservetion } from '../models/reservation.model';
import { ServiceRes } from '../models/serviceRes.model';
import { GLOBAL } from './global.service';

@Injectable({
  providedIn: 'root'
})
export class ReservetionService {
  public rute: String;
  public token;
  public dataReservation;
  public dataServiceRes;
  public dataService;
  public headersVariable = new HttpHeaders().set('Content-Type', 'application/json');
  constructor(public _http: HttpClient) {
    this.rute = GLOBAL.url
   }

   registerReservetion(reservetion: Reservetion,roomId,token): Observable<any>{
    let params = JSON.stringify(reservetion);
    let headersToken = this.headersVariable.set('Authorization',token)
    return this._http.post(this.rute + 'addReservation/'+roomId ,params, { headers: headersToken })
  }

  registerServiceRes(id, idService): Observable<any>{
    return this._http.put(this.rute + 'addServiceReservation/'+id+'/'+idService,{headers: this.headersVariable})
  }

  getDataReservation(){
    var data2 = JSON.parse(localStorage.getItem('dataReservation'));
      if (data2 != 'undefined') {
        this.dataReservation = data2;
      } else {
        this.dataReservation = null;
      }
      return this.dataReservation;
  }

  getDataService(){
    var data2 = JSON.parse(localStorage.getItem('dataService'));
      if (data2 != 'undefined') {
        this.dataService = data2;
      } else {
        this.dataService = null;
      }
      return this.dataService;
  }

  listReservations():Observable<any>{
    return this._http.get(this.rute+'listReservations')
  }

  listServiceRes(id):Observable<any>{
    return this._http.get(this.rute+ 'listServiceRes/'+id)
  }

  getDataServiceRes(){
    var data2 = JSON.parse(localStorage.getItem('dataServicesRes'));
      if (data2 != 'undefined') {
        this.dataServiceRes = data2;
      } else {
        this.dataServiceRes = null;
      }
      return this.dataServiceRes;
  }

  listReservationUser(token):Observable<any>{
    let headersToken = this.headersVariable.set('Authorization',token);
    return this._http.get(this.rute+ 'listReservationUser',{ headers: headersToken })
  }


}
