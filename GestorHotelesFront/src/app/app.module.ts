import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NavbarComponent } from './components/navbar/navbar.component';
import { UsersComponent } from './components/users/users.component';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { RegisterComponent } from './components/register/register.component';
import { LoginComponent } from './components/login/login.component';
import { HomeComponent } from './components/home/home.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HotelsComponent } from './components/hotels/hotels.component';
import { ImageHotelsComponent } from './components/image-hotels/image-hotels.component';
import { HotelInformationComponent } from './components/hotel-information/hotel-information.component';
import { RoomsComponent } from './components/rooms/rooms.component';
import { EventsComponent } from './components/events/events.component';
import { FilterPipe } from './pipes/filter.pipe';
import { RoomInformationComponent } from './components/room-information/room-information.component';
import { ServicesComponent } from './components/services/services.component';
import { UsersAdminComponent } from './components/users-admin/users-admin.component';
import { ReservationComponent } from './components/reservation/reservation.component';
import { MyreservationComponent } from './components/myreservation/myreservation.component';


@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    UsersComponent,
    RegisterComponent,
    LoginComponent,
    HomeComponent,
    HotelsComponent,
    ImageHotelsComponent,
    HotelInformationComponent,
    RoomsComponent,
    EventsComponent,
    FilterPipe,
    RoomInformationComponent,
    ServicesComponent,
    UsersAdminComponent,
    ReservationComponent,
    MyreservationComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    BrowserAnimationsModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
