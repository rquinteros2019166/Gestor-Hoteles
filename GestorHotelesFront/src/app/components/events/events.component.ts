import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { EventsHotel } from 'src/app/models/events.model';
import { EventService } from 'src/app/services/event.service';
import { UserService } from 'src/app/services/user.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-events',
  templateUrl: './events.component.html',
  styleUrls: ['./events.component.scss'],
  providers: [EventService, UserService]
})
export class EventsComponent implements OnInit {
  public token: String;
  public modelAddEvent: EventsHotel;

  constructor(
    public _eventService: EventService,
    public _userService: UserService,
    private _router: Router
  ) {
    this.token = this._userService.getToken();
    this.modelAddEvent = new EventsHotel('','','','','','')
   }

  ngOnInit(): void {
  }

  addEvent(){
    this._eventService.registeEvent(this.modelAddEvent, this.token)
    .subscribe(
      response=>{
        console.log(response)

        Swal.fire({
          position: 'center',
          icon: 'success',
          title: 'El evento se creo correctamente',
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
