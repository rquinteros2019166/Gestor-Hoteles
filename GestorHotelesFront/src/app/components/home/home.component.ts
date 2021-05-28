import { Component, OnInit } from '@angular/core';
import { Hotel } from 'src/app/models/hotel.model';
import { HotelService } from 'src/app/services/hotel.service';
import { UserService } from 'src/app/services/user.service';
import { Router } from '@angular/router';
import { Pipe, PipeTransform } from '@angular/core';


@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
  providers: [HotelService]
})
export class HomeComponent implements OnInit {
  public token: String;
  public dataHotel :String;
  public modelGetHotel : Hotel;
  constructor(
    public _hotelService: HotelService,
    public _userService: UserService,
    public _router: Router,
  ) {
    this.token = this._userService.getToken();
   }
   filterHotel = ''

  ngOnInit(): void {
    this.getHotels()
  }
  getHotels(){
    this._hotelService.listHotel().subscribe(
      response =>{
        console.log(response.hotelsFound)
        this.modelGetHotel = response.hotelsFound;
      }
    )
  }

  getHotelId(id){
    this._hotelService.getHotelId(id).subscribe(
      response =>{
        this.dataHotel = response.hotelFound;
        localStorage.setItem('dataHotel',JSON.stringify(this.dataHotel))
        this._router.navigate(['/hotelInfo'])
      }
    )
  }

}
