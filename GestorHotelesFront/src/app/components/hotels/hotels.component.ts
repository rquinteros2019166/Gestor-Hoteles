import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Hotel } from 'src/app/models/hotel.model';
import { HotelService } from 'src/app/services/hotel.service';
import { UserService } from 'src/app/services/user.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-hotels',
  templateUrl: './hotels.component.html',
  styleUrls: ['./hotels.component.scss'],
  providers: [HotelService,UserService]
})
export class HotelsComponent implements OnInit {
  public token: String;
  public modelAddHotel: Hotel
  constructor(
    public _hotelServie: HotelService,
    public _userService: UserService,
    private _router: Router
  ){
    this.token = this._userService.getToken();
    this.modelAddHotel = new Hotel('','','','','','',[],0)
   }

  ngOnInit(): void {

  }

  addHotel(){
    this._hotelServie.registerHotel(this.modelAddHotel, this.token).subscribe(
      response=>{
        console.log(response)

        Swal.fire({
          position: 'center',
          icon: 'success',
          title: 'El Hotel se creo correctamente',
          showConfirmButton: false,
          timer: 1500
        })
        this._router.navigate(['/home'])
      },
      error =>{
        console.log(<any>error)

        Swal.fire({
          position: 'center',
          icon: 'error',
          title: error.error.message,
          showConfirmButton: false,
          timer: 1500
        })
      }
    )}
}
