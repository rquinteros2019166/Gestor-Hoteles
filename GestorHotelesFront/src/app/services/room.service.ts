import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Room } from '../models/room.model';
import { GLOBAL } from './global.service';

@Injectable({
  providedIn: 'root'
})
export class RoomService {
  public rute : String;
  public headersVariable = new HttpHeaders().set('Content-Type', 'application/json');
  public token;
  public identity;
  public dataRoom;

  constructor(public _http: HttpClient){
    this.rute = GLOBAL.url;
   }

  listRooms():Observable<any>{
    return this._http.get(this.rute+'listRooms')
  }

  registerRoom(room: Room, token): Observable<any> {
    let params = JSON.stringify(room);
    let headersToken = this.headersVariable.set('Authorization', token)
    return this._http.post(this.rute + 'saveRoom',params, { headers: headersToken })
  }

  getRoomId(id : String):Observable<any> {
    return this._http.get(this.rute + 'listRoomId/'+id,{headers: this.headersVariable})
  }

  getDataRoom(){
    var data2 = JSON.parse(localStorage.getItem('dataRoom'));
      if (data2 != 'undefined') {
        this.dataRoom = data2;
      } else {
        this.dataRoom = null;
      }
      return this.dataRoom;
  }

}
