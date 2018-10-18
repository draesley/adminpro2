import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { UserService } from '../user/user.service';

@Injectable({
  providedIn: 'root'
})
export class LoginGuardGuard implements CanActivate {

  constructor(private userService:UserService,
              private router:Router){

  }

  canActivate(){

    if(this.userService.userSignin()){
      return true;
    }else{
      this.router.navigate(['/login']);
      return false;
    }
  }
}
