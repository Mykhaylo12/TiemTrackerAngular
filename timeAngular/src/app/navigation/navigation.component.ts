import { Component, OnInit } from '@angular/core';
import {AuthService} from "../service/AuthService";

@Component({
  selector: 'app-navigation',
  templateUrl: './navigation.component.html',
  styleUrls: ['./navigation.component.css']
})
export class NavigationComponent implements OnInit {
  isLoggedIn$: boolean = this.authService.isLoggedIn;
  isAdmin$: boolean = false;
  isUser$: boolean = false;
  username: string | null = sessionStorage.getItem("username");

  constructor(private authService: AuthService) {
  }
    ngOnInit() : void {
      this.isLoggedIn$ = Boolean(sessionStorage.getItem("isLogged"));
      // @ts-ignore
      this.isAdmin$ = Boolean((sessionStorage.getItem("roles").includes("ROLE_ADMIN")));
      // @ts-ignore
      this.isUser$ = Boolean((sessionStorage.getItem("roles").includes("ROLE_USER")));
    }

    logout(){
      this.authService.logout();
      window.location.replace('/login');
    }

}
