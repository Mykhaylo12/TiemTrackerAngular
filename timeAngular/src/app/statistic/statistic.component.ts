import {Component, OnInit} from '@angular/core';
import {Time} from "@angular/common";
import {ApiService} from "../service/api.service";
import {RequestReportViewModel} from "../models/requestReportViewModel";
import {FormControl, FormGroup} from '@angular/forms';
import {count} from "rxjs/operators";



@Component({
  selector: 'app-statistic',
  templateUrl: './statistic.component.html',
  styleUrls: ['./statistic.component.css']
})
export class StatisticComponent implements OnInit {
  todayDate: string;
  monthYear: string;
  monthSum: string;
  rate: number;
  salary: null | number;

  dailyReports = Array<ReportViewModel>();
  monthReport: MonthlyReport = {
    dailyReports: [],
    monthSum: ''
  };


  constructor(private apiService: ApiService) {
    this.monthSum = '';
    this.rate = 0;
    this.salary = 0;
    this.todayDate = new Date().toLocaleDateString();
    this.monthYear = new Date().toLocaleDateString();
  }


  ngOnInit(): void {
    // this.pickMonthYear(this.todayDate);
  }



  pickMonthYear(monthYear: string) {
    console.log(monthYear);
    let userId = sessionStorage.getItem("userId");
    if (userId == null) {
      return;
    }

    let reportRequest: RequestReportViewModel = {
      date: monthYear,
      userId: userId
    }
    console.log(reportRequest)

    this.apiService.getMonthlyReport(reportRequest).subscribe(
      data => {
        console.log("this.monthReport", data)

        this.monthReport = data;
        this.dailyReports = this.monthReport.dailyReports;
        console.log("dailyReports", this.dailyReports)
        this.monthSum = this.monthReport.monthSum;

        // @ts-ignore
        this.apiService.getUserById(userId).subscribe(
          data => {
            this.rate = data.rate;
            this.salary = this.countMonthSalary(this.monthSum, this.rate);
          },
          error => {
            alert("Error occurred while getting user by id ")
          }
        )


      },
      error => {
        alert("Error occurred while getting monthly report ")
      }
    )

  }

  toTimeString(time: Date) {
    if (time == null) {
      return;
    }
    let date = new Date(time);
    return date.toLocaleTimeString();
  }


   countMonthSalary(monthSum: string, rate: number) {
    if (monthSum == null || rate == null) {
      return null;
    }
    let strings = monthSum.split(":", 2);
     console.log("strings", strings)
    let hourSalary = Number.parseInt(strings[0]) * rate;
     console.log("hourSalary", hourSalary)
    let minuteSalary = Math.round(Number.parseInt(strings[1]) * rate/60);
     console.log("minuteSalary", minuteSalary)
    return hourSalary + minuteSalary

  }

}

export interface MonthlyReport {
  dailyReports: Array<ReportViewModel>;
  monthSum: string;
}

export interface ReportViewModel {
  date: Date;
  inOuts: Array<InOut>;
  noteBody: string;
  daySum: string;
}

export interface InOut {
  in: Date;
  out: Date;
  difference: string;
}


