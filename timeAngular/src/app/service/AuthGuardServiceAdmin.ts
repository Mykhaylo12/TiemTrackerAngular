import {Injectable} from "@angular/core";
import {ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot} from "@angular/router";
import {AuthService} from "./AuthService";


@Injectable({
    providedIn: 'root'
})
export class AuthGuardServiceAdmin implements CanActivate {
  constructor(private router: Router,
              private authService: AuthService) {
  }

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
    // @ts-ignore
    if (this.authService.isUserLoggedIn() && (sessionStorage.getItem("roles").includes("ROLE_ADMIN")))
      return true;
    this.router.navigate(['login']);
    return false;
  }
}
