import { Component, OnInit } from '@angular/core';
import { ReservetionService } from 'src/app/services/reservetion.service';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-myreservation',
  templateUrl: './myreservation.component.html',
  styleUrls: ['./myreservation.component.scss'],
  providers:[ReservetionService,UserService]
})
export class MyreservationComponent implements OnInit {
  public reservationList;
  public token;
  constructor(
    private _reservetionService: ReservetionService,
    private _userService: UserService,
    ){
    this.token = this._userService.getToken();
   }

  ngOnInit(): void {
    this.getReservations();
  }

  getReservations() {
    this._reservetionService.listReservationUser(this.token).subscribe(
      response => {
        console.log(response.reservationFind)
        localStorage.setItem('myRes',JSON.stringify(response.reservationFind))
        this.reservationList = localStorage.getItem('myRes');
      },
      error=>{
        console.log(<any>error)
      }
    )
  }
}
