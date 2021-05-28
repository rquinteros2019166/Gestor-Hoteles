import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { EventsHotel } from 'src/app/models/events.model';
import { Room } from 'src/app/models/room.model';
import { Service } from 'src/app/models/service.model';
import { EventService } from 'src/app/services/event.service';
import { HotelService } from 'src/app/services/hotel.service';
import { RoomService } from 'src/app/services/room.service';
import { ServiceService } from 'src/app/services/service.service';

@Component({
  selector: 'app-hotel-information',
  templateUrl: './hotel-information.component.html',
  styleUrls: ['./hotel-information.component.scss'],
  providers: [HotelService, RoomService, EventService, ServiceService]
})
export class HotelInformationComponent implements OnInit {
  public modelGetRoom : Room;
  public modelGetEvent: EventsHotel;
  public modelGetService : Service
  public dataRoom :String;
  public dataNull: [String];
  constructor(
    public _hotelService: HotelService,
    public _roomService: RoomService,
    public _eventService: EventService,
    public _serviceService: ServiceService,
    public _router: Router,
  ) { }

  ngOnInit(): void {
    this.getRooms();
    this.getEvents();
    this.getServices();
  }

  getRooms(){
    this._roomService.listRooms().subscribe(
      response =>{
        console.log(response.roomsFound)
        this.modelGetRoom = response.roomsFound;
      }
    )
  }

  getEvents(){
    this._eventService.listEvents().subscribe(
      response =>{
        console.log(response.eventsFound)
        this.modelGetEvent = response.eventsFound;
      }
    )
  }

  getRoomId(id){
    this._roomService.getRoomId(id).subscribe(
      response =>{
        this.dataRoom = response.roomFound;
        this.dataNull = [''];
        localStorage.setItem('dataRoom',JSON.stringify(this.dataRoom));
        localStorage.setItem('bill',JSON.stringify(this.dataNull));
        localStorage.setItem('dataReservation',JSON.stringify(this.dataNull))

        this._router.navigate(['/roomInfo'])
      }
    )
  }

  getServices(){
    this._serviceService.listService().subscribe(
      response=>{
        console.log(response.servicesFound)
        this.modelGetService = response.servicesFound;
      },
      error=>{
        console.log(<any>error)
      }
    )
  }
}
