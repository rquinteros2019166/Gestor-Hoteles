import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { GLOBAL } from './global.service';

@Injectable({
  providedIn: 'root'
})
export class BillService {
  public rute: String;
  public dataBill;
  public headersVariable = new HttpHeaders().set('Content-Type', 'application/json');
  constructor(public _http: HttpClient) {
    this.rute = GLOBAL.url
   }

  registerBill(id,token): Observable<any>{
    let headersToken = this.headersVariable.set('Authorization',token)
    return this._http.post(this.rute + 'addBill/'+id,{headers: headersToken})
  }

  getBill(){
    var data2 = JSON.parse(localStorage.getItem('bill'));
      if (data2 != 'undefined') {
        this.dataBill = data2;
      } else {
        this.dataBill = null;
      }
      return this.dataBill;
  }

}
