import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Hotel } from '../models/hotel.model';
import { GLOBAL } from './global.service';

@Injectable({
  providedIn: 'root'
})
export class HotelService {
  public rute : String;
  public headersVariable = new HttpHeaders().set('Content-Type', 'application/json');
  public token;
  public identidad;
  public dataHotel;
  constructor(public _http: HttpClient) {
    this.rute = GLOBAL.url;
   }

   registerHotel(hotel : Hotel,token): Observable<any> {
     let params = JSON.stringify(hotel);
     let headersToken = this.headersVariable.set('Authorization', token)
     return this._http.post(this.rute +'saveHotel',params, { headers: headersToken })
   }

   listHotel():Observable<any>{
     return this._http.get(this.rute+'listHotels')
   }

   getHotel(name:String): Observable<any> {
     return this._http.get(this.rute + 'searchHotel/'+name,{headers: this.headersVariable})
   }

   getHotelId(id : String):Observable<any> {
     return this._http.get(this.rute + 'listHotelId/'+id,{headers: this.headersVariable})
   }

   getDataHotel() {
    var data2 = JSON.parse(localStorage.getItem('dataHotel'));
    if (data2 != 'undefined') {
      this.dataHotel = data2;
    } else {
      this.dataHotel = null;
    }
    return this.dataHotel;
  }



}
