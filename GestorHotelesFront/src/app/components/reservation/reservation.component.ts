import { Component, OnInit } from '@angular/core';
import { ReservetionService } from 'src/app/services/reservetion.service';

@Component({
  selector: 'app-reservation',
  templateUrl: './reservation.component.html',
  styleUrls: ['./reservation.component.scss'],
  providers: [ReservetionService]
})
export class ReservationComponent implements OnInit {
  public  reservationList;
  constructor(public _reservetionService: ReservetionService) { }

  ngOnInit(): void {
    this.getReservation()
  }

  getReservation(){
    this._reservetionService.listReservations().subscribe(
      response=>{
        console.log(response.reservetionsFound)
        this.reservationList = response.reservetionsFound;
      }
    )
  }

}
