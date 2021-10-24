import { Injectable } from "@angular/core";
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot } from "@angular/router";
import { AuthService } from "./auth.service";


@Injectable()
export class AuthGuard implements CanActivate {

    // inject authService because there you can find out if user is authenticated or not
    constructor(private authServ: AuthService, private router: Router) {}


    canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): any {
        if(this.authServ.isAuth()) {
            return true;
        }else  {
            this.router.navigate(['/login']);
        }
    }
}