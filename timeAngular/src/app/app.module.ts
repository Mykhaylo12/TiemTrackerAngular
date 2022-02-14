import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import {HttpClientModule} from "@angular/common/http";

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { RegistrationComponent } from './registration/registration.component';
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import { NavigationComponent } from './navigation/navigation.component';
import { LoginComponent } from './login/login.component';
import { AdminComponent } from './admin/admin.component';
import {authInterceptorProviders} from "./service/TokenInterceptor";
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { ClockingComponent } from './clocking/clocking.component';
import { StatisticComponent } from './statistic/statistic.component';

import { NgMonthPickerModule } from 'ng-month-picker';
import { NotFoundComponent } from './not-found/not-found.component';



@NgModule({
  declarations: [
    AppComponent,
    RegistrationComponent,
    NavigationComponent,
    LoginComponent,
    AdminComponent,
    ClockingComponent,
    StatisticComponent,
    NotFoundComponent,

  ],
  imports: [
    NgMonthPickerModule,

    HttpClientModule,
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    NgbModule,
    ReactiveFormsModule
  ],
  providers: [LoginComponent,authInterceptorProviders],
  bootstrap: [AppComponent]
})
export class AppModule { }
