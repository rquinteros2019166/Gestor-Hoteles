import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './components/home/home.component';
import { LoginComponent } from './components/login/login.component';
import { RegisterComponent } from './components/register/register.component';
import { UsersComponent } from './components/users/users.component';
import { HotelsComponent }from './components/hotels/hotels.component';
import { ImageHotelsComponent } from './components/image-hotels/image-hotels.component';
import { HotelInformationComponent } from './components/hotel-information/hotel-information.component';
import { RoomsComponent} from './components/rooms/rooms.component';
import { EventsComponent } from './components/events/events.component';
import { RoomInformationComponent } from './components/room-information/room-information.component';
import { ServicesComponent } from './components/services/services.component';
import { UsersAdminComponent } from './components/users-admin/users-admin.component';
import { ReservationComponent } from './components/reservation/reservation.component';
import { MyreservationComponent } from './components/myreservation/myreservation.component';

const routes: Routes = [
  { path: 'register', component: RegisterComponent },
  { path: 'login', component: LoginComponent },
  { path: 'home', component: HomeComponent },
  { path: 'users', component: UsersComponent },
  { path: 'hotels', component: HotelsComponent},
  { path: 'imageHotels', component: ImageHotelsComponent},
  { path: 'hotelInfo',component: HotelInformationComponent},
  { path: 'room', component: RoomsComponent},
  { path: 'events',component: EventsComponent},
  { path: 'roomInfo',component: RoomInformationComponent},
  { path: 'services',component: ServicesComponent},
  { path: 'usersAdmin',component: UsersAdminComponent},
  { path: 'reservations',component: ReservationComponent},
  { path: 'myreservations',component:MyreservationComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
