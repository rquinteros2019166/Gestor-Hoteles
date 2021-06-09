import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Hotel } from 'src/app/models/hotel.model';
import { Service } from 'src/app/models/service.model';
import { User } from 'src/app/models/user.model';
import { HotelService } from 'src/app/services/hotel.service';
import { ServiceService } from 'src/app/services/service.service';
import { UserService } from 'src/app/services/user.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss'],
  providers: [UserService,ServiceService]
})
export class NavbarComponent implements OnInit {
  public identity;
  public token;
  public userIdModel: User;
  public modelGetHotel : Hotel;
  public modelAddService: Service;
  constructor(
    public _userService: UserService,
    public _hotelService: HotelService,
    public _serviceService: ServiceService,
    private _router: Router)
  {
    //this.identity = this._userService.getIdentity();
    this.userIdModel = new User('','','','','','')
    this.token = this._userService.getToken();
    this.modelAddService = new Service('','','','','','')
   }
   filterHotel = ''

  ngOnInit(): void {
    console.log(this.identity)
    this.getHotels();
  }

  singOff(){
    localStorage.clear();
    this.identity = null;
    this.token =null;
    this._router.navigate(['/home'])
  }

  getUserId(id){
    this._userService.getUser(id).subscribe(
      response =>{
        this.userIdModel = response.userFound;
        console.log(response.userFound)
        console.log(id)
      }
    )
  }

  editUser(){
    this._userService.editUser(this.userIdModel).subscribe(
      response=>{
        console.log(response);
        this._router.navigate(['/home'])
      }
    )
  }

  deleteUser(id){
    this._userService.deleteUser(id).subscribe(
      response=>{
        console.log(response);
        this.singOff()
        this._router.navigate(['/home'])
      }
    )
  }

  searchHotel(hotelname :String){
    this._hotelService.getHotel(hotelname).subscribe(
      response=>{
        console.log(response);
      }
    )
  }

  getHotels(){
    this._hotelService.listHotel().subscribe(
      response =>{
        console.log(response.encuestasEncontradas)
        this.modelGetHotel = response.hotelsFound;
      }
    )
  }


  addService(){
    this._serviceService.registerService(this.modelAddService, this.token)
    .subscribe(
      response=>{
        console.log(response)

        Swal.fire({
          position: 'center',
          icon: 'success',
          title: 'El Servicio se creo correctamente',
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
          //title: error.error.message,
          showConfirmButton: false,
          timer: 1500
        })
      }
    )}




}
