import {Injectable} from '@angular/core';
import {HttpClient, HttpParams} from "@angular/common/http";
import {User} from "../models/models.user";
import {RegistrationDto} from "../registration/registration.component";
import {Observable} from "rxjs";
import {LoginViewModel} from "../login/login.component";
import {UserViewModel} from "../admin/admin.component";
import {ClockingViewModel} from "../clocking/clocking.component";
import {MonthlyReport, ReportViewModel} from "../statistic/statistic.component";
import {RequestReportViewModel} from "../models/requestReportViewModel";

@Injectable({
  providedIn: 'root'
})

export class ApiService {
  private BASE_URL = "http://localhost:8180/";
  private GET_ALL_USERS = this.BASE_URL + "user";
  private REGISTRATION = this.BASE_URL + "registration";
  private LOGIN = this.BASE_URL + "login";
  private DELETE_USER = this.BASE_URL + "user/";
  private GET_USER_BY_ID = this.BASE_URL + "user/";

  private UPDATE_USER = this.BASE_URL + "user";
  private GET_LAST_USER_CLOCKING = this.BASE_URL + "clocking/last-user-clocking";
  private SAVE_USER_CLOCKING = this.BASE_URL + "clocking";
  private GET_MONTHLY_REPORT = this.BASE_URL + "clocking/report";

  constructor(private http: HttpClient) {
  }

  getAllUsers() {
    return this.http.get<User[]>(this.GET_ALL_USERS)
  }

  registration(registrationModel: RegistrationDto): Observable<RegistrationDto> {
    return this.http.post<RegistrationDto>(this.REGISTRATION, registrationModel);
  }

  authenticate(loginViewModel: LoginViewModel): Observable<User> {
    return this.http.post<User>(this.LOGIN, loginViewModel);
  }

  deleteUser(userId: string) {
    return this.http.delete(this.DELETE_USER + userId);
  }

  updateUser(userViewModel: UserViewModel) {
    return this.http.post<User[]>(this.UPDATE_USER, userViewModel);
  }

  getLastUserClocking(clocking: ClockingViewModel) {
    return this.http.post<ClockingViewModel>(this.GET_LAST_USER_CLOCKING, clocking)
  }

  saveUserClocking(clocking: ClockingViewModel) {
    return this.http.post<ClockingViewModel>(this.SAVE_USER_CLOCKING, clocking)
  }

  getMonthlyReport(requestReport: RequestReportViewModel) {
    return this.http.post<MonthlyReport>(this.GET_MONTHLY_REPORT, requestReport)
  }

  getUserById(userId: string) {
    return this.http.get<User>(this.GET_USER_BY_ID + userId)
  }
}
