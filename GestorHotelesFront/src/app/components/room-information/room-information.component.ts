import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Reservetion } from 'src/app/models/reservation.model';
import { Service } from 'src/app/models/service.model';
import { ServiceRes } from 'src/app/models/serviceRes.model';
import { BillService } from 'src/app/services/bill.service';
import { HotelService } from 'src/app/services/hotel.service';
import { ReservetionService } from 'src/app/services/reservetion.service';
import { RoomService } from 'src/app/services/room.service';
import { ServiceService } from 'src/app/services/service.service';
import { UserService } from 'src/app/services/user.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-room-information',
  templateUrl: './room-information.component.html',
  styleUrls: ['./room-information.component.scss'],
  providers: [RoomService, HotelService, ServiceService,ReservetionService, UserService, BillService]
})
export class RoomInformationComponent implements OnInit {
  public modelGetService : Service;
  public modelGetServiceRes : [];
  public reservetionModel : Reservetion;
  public serviceResModel: ServiceRes
  public idRoom: String;
  public idReservation: String;
  public idService: String;
  public token: String;
  public dataNow: [String]
  public dataService: [String];
  public dataReser: [String]
  public data: String;
  constructor(
    public _roomService: RoomService,
    public _hotelService: HotelService,
    public _serviceService: ServiceService,
    public _reservetionService : ReservetionService,
    public _userService: UserService,
    public _billService: BillService,
    private _router: Router
  ) {
    this.reservetionModel = new Reservetion("","","",[{service:'',nameService:'',price:0,}],"");
    this.idRoom = _roomService.getDataRoom()._id;
    this.token = _userService.getToken();
   }

  ngOnInit(): void {
    this.getServices();
  }

  getServices(){
    this._serviceService.listService().subscribe(
      response=>{
        console.log(response.servicesFound)
        this.modelGetService = response.servicesFound;
        this.dataNow = ['']
        localStorage.setItem('dataService',JSON.stringify(this.dataNow))
      },
      error=>{
        console.log(<any>error)
      }
    )
  }

  addReservation(){
    this._reservetionService.registerReservetion(this.reservetionModel,this.idRoom,this.token).subscribe(
      response=>{
        console.log(response)
        localStorage.setItem('dataReservation',JSON.stringify(response.reservetionSaved))
        Swal.fire({
          position: 'center',
          icon: 'success',
          title: 'La reservacion se creo correctamente',
          showConfirmButton: false,
          timer: 1500
        })
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
    )
  }

  getServiceId(id){
    this._serviceService.getServiceId(id).subscribe(
      response =>{
        this.dataService = response.serviceFound;
        localStorage.setItem('dataService',JSON.stringify(this.dataService))
        this.idReservation = this._reservetionService.getDataReservation()._id;

        this.reservetionModel.services = [{
          service: this._reservetionService.getDataService()._id,
          nameService: this._reservetionService.getDataService().nameService,
          price:this._reservetionService.getDataService().price,
        }]
        this.addSerRes();
      },
      error=>{
        console.log(<any>error)
      }
    )
  }

  addSerRes(){
    this.idService = this._reservetionService.getDataService()._id;
    this._reservetionService.registerServiceRes(this.idReservation,this.idService).subscribe(
      response=>{
        this.dataReser = response.totalUpdate;
        localStorage.setItem('dataReservation',JSON.stringify(this.dataReser))
        Swal.fire({
          position: 'center',
          icon: 'success',
          title: 'Se agregaron correctamente los servicios',
          showConfirmButton: false,
          timer: 1500
        })
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
    )
  }

  addBill(){
    this.idReservation = this._reservetionService.getDataReservation()._id;
    this._billService.registerBill(this.idReservation, this.token).subscribe(
      response=>{
        localStorage.setItem('bill',JSON.stringify(response.billSaved))
        this.listServiceRes();
        Swal.fire({
          position: 'center',
          icon: 'success',
          title: 'Su factura se creo correctamente',
          showConfirmButton: false,
          timer: 1500
        })
      },
      error =>{
        console.log(<any>error)
        console.log(<any>this.token)
        Swal.fire({
          position: 'center',
          icon: 'error',
          title: error.error.message,
          showConfirmButton: false,
          timer: 1500
        })
      }
    )
  }

  listServiceRes(){
    this._reservetionService.listServiceRes(this._reservetionService.getDataReservation()._id).subscribe(response =>{
      localStorage.setItem('dataServicesRes',JSON.stringify(response.arrayCoincidences))
      this.modelGetServiceRes = response.arrayCoincidences;
      Swal.fire({
        position: 'center',
        icon: 'success',
        title: 'Su factura se creo correctamente',
        showConfirmButton: false,
        timer: 1500
      })
    },
    error =>{
      console.log(<any>error)
      console.log(<any>this.token)
      Swal.fire({
        position: 'center',
        icon: 'error',
        title: error.error.message,
        showConfirmButton: false,
        timer: 1500
      })
    })
  }
}
