import {Component, OnInit} from '@angular/core';
import {User} from "../models/models.user";
import {ApiService} from "../service/api.service";
import {NgbModal, NgbModalConfig} from "@ng-bootstrap/ng-bootstrap";
import {FormGroup, FormBuilder, FormsModule} from '@angular/forms';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.css'],
  providers: [NgbModalConfig, NgbModal]
})
export class AdminComponent implements OnInit {
  editProfileForm: FormGroup;
  users: User[] = [];


  constructor(private fb: FormBuilder,
              private apiService: ApiService,
              private modalService: NgbModal,
              config: NgbModalConfig) {
  }

  ngOnInit(): void {
    this.getAllUsers();
    this.editProfileForm = this.fb.group({
      id:[''],
      rate:[''],
      username: [''],
      email: ['']
    });
  }

  delete(user: User) {
    this.apiService.deleteUser(user.id).subscribe(
      data => {
        let indexOfUser = this.users.indexOf(user);
        this.users.splice(indexOfUser, 1)
      },
      error => {
        alert("Error occurred while deleting user with id " + user.id)
      }
    )
  }

  private getAllUsers() {
    this.apiService.getAllUsers().subscribe(
      data => {
        this.users = data
      },
      err => {
        alert("Error occurred while getting users ")
      }
    );
  }

  open(targetModal:FormsModule, user: User) {
    this.modalService.open(targetModal, {
      centered: true,
      backdrop: 'static'
    });

    this.editProfileForm.patchValue({
      id:user.id,
      rate: user.rate,
      username: user.username,
      email: user.email
    });

  }

  onSubmit() {
     this.modalService.dismissAll();


    this.apiService.updateUser(this.editProfileForm.getRawValue()).subscribe(
      data => {
        this.users = data
      },
      err => {
        alert("Error occurred while changing users ")
      }
    );



  }

}

export interface UserViewModel {
  id:string;
  email: string;
  username: string;
  rate:string;
}

