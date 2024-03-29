import { BrowserModule } from '@angular/platform-browser';
import { Component, NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BsDatepickerModule } from 'ngx-bootstrap/datepicker';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AgGridModule } from 'ag-grid-angular';
import { ToastrModule } from 'ngx-toastr';


import { HomeComponent } from './home/home.component';
import { UsersComponent } from './users/users.component';
import { LoginComponent } from './login/login.component';
import { RegistrationComponent } from './registration/registration.component';
import { HttpClientModule } from '@angular/common/http';
import { ErrorComponent } from './error/error.component';
import { MenuComponent } from './menu/menu.component';
import { AdminComponent } from './admin/admin.component';
import { UpdateProfilePicComponent } from './update-profile-pic/update-profile-pic.component';




const routes: Routes = [
  { path: 'home', component: HomeComponent},
  { path: 'users',component:UsersComponent},
  {path:'register',component:RegistrationComponent},
  {path:'error',component:ErrorComponent},
  {path:'admin',component:AdminComponent},
  {path:'updateProfilePic',component:UpdateProfilePicComponent},
  // otherwise redirect to home
  { path: '**', redirectTo: 'home' }
];


@NgModule({
  declarations: [
    AppComponent,
    UsersComponent,
    LoginComponent,
    RegistrationComponent,
    ErrorComponent,
    MenuComponent,
    HomeComponent,
    AdminComponent,
    UpdateProfilePicComponent
   
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    BsDatepickerModule.forRoot(),
    [RouterModule.forRoot(routes, { relativeLinkResolution: 'legacy' })],
     ReactiveFormsModule,
     HttpClientModule,
     AgGridModule.withComponents([]),
     ToastrModule.forRoot({timeOut: 1500}),
     FormsModule
   
  ],
  exports: [RouterModule],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
