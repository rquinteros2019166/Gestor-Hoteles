import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Room } from 'src/app/models/room.model';
import { RoomService } from 'src/app/services/room.service';
import { UserService } from 'src/app/services/user.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-rooms',
  templateUrl: './rooms.component.html',
  styleUrls: ['./rooms.component.scss'],
  providers:[RoomService,UserService]
})
export class RoomsComponent implements OnInit {
  public token: String;
  public modelAddRoom: Room;
  constructor(
    public _roomService : RoomService,
    public _userService: UserService,
    private _router: Router
  ){
    this.token = this._userService.getToken();
    this.modelAddRoom = new Room('','','','','','')
   }

  ngOnInit(): void {
  }

  addRoom(){
    this._roomService.registerRoom(this.modelAddRoom, this.token)
    .subscribe(
      response=>{
        console.log(response)

        Swal.fire({
          position: 'center',
          icon: 'success',
          title: 'La habitacion se creo correctamente',
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


