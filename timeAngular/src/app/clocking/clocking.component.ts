import {Component, OnInit} from '@angular/core';
import {ApiService} from "../service/api.service";

@Component({
  selector: 'app-clocking',
  templateUrl: './clocking.component.html',
  styleUrls: ['./clocking.component.css']
})
export class ClockingComponent implements OnInit {
  model: ClockingViewModel = {
    dateTime: new Date(),
    status: false,
    noteBody: '',
    userId: ''
  };
  showLastAction = false;
  timer=new Date();

  constructor(private apiService: ApiService) {
    setInterval(() => {
      this.model.dateTime = this.timer= new Date()
    }, 1000)
  }

  ngOnInit(): void {
    this.getLastUserClocking();
  }

  getLastUserClocking() {

    let userId = sessionStorage.getItem("userId");
    if (userId == null) {
      return;
    }
    let modelLastUserClocking:ClockingViewModel = {
      dateTime: new Date(),
      status: false,
      noteBody: '',
      userId: userId
    }

    this.apiService.getLastUserClocking(modelLastUserClocking).subscribe(
      data => {
        if (data != null) {

          this.model.status = data.status;
          console.log(data.dateTime);
          console.log( new Date().getDate());


          this.model.noteBody=data.noteBody;
          // this.lastActionTime=data.dateTime
        } else {
          this.model.status = false;
        }
      },
      err => {
        alert("Error occurred while getting clocking details ")
      }
    );
  }

  clockInOut(status: boolean, noteBody: string) {
    let userId = sessionStorage.getItem("userId");
    if (userId == null) {
      alert("Error occurred while clocking. No userId detected ")
      return;
    }

    this.model = {
      dateTime: new Date(),
      status: status,
      noteBody: noteBody,
      userId: userId
    }
    console.log(this.model);
    this.apiService.saveUserClocking(this.model).subscribe(
      data => {
        if (data == null) {
          this.model.status = false;
        }
        console.log(data);
        this.model = data
      },
      err => {
        alert("Error occurred while clocking ")
      }
    );
    this.showLastAction = true
  }
}

export interface ClockingViewModel {
  dateTime: Date;
  status: boolean;
  noteBody: string;
  userId: string
}
