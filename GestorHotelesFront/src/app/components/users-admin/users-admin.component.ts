import { Component, OnInit } from '@angular/core';
import { Hotel } from 'src/app/models/hotel.model';
import { HotelService } from 'src/app/services/hotel.service';

@Component({
  selector: 'app-users-admin',
  templateUrl: './users-admin.component.html',
  styleUrls: ['./users-admin.component.scss'],
  providers:[HotelService]
})
export class UsersAdminComponent implements OnInit {
  public hotelsList;
  public hotelIdModel: Hotel;
  constructor(private _hotelService: HotelService) {
    this.hotelIdModel = new Hotel('','','','','','',[],0)
   }

  ngOnInit(): void {
    this.getHotels()
  }
  getHotels(){
    this._hotelService.listHotel().subscribe(
      response=>{
        console.log(response.hotelsFound)
        this.hotelsList = response.hotelsFound;
      }
    )
  }

}
