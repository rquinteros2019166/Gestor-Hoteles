import { Component, OnInit } from '@angular/core';
import { User } from 'src/app/models/user.model';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.scss'],
  providers: [UserService]
})
export class UsersComponent implements OnInit {
  public userList;
  public userIdModel: User;
  private _router: any;
  constructor(private _userService: UserService) {
    this.userIdModel = new User('', '', '', '', '', '')
  }

  ngOnInit(): void {
    this.getUsers()
  }
  getUsers() {
    this._userService.getUsers().subscribe(
      response => {
        console.log(response.usersFound)
        this.userList = response.usersFound;
      }
    )
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
    this._userService.editUserAdmin(this.userIdModel).subscribe(
      response=>{
        console.log(response);
        this.getUsers();
      }
    )
  }



}
