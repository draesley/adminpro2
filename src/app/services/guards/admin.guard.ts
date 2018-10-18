import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { UserService } from '../user/user.service';

@Injectable({
  providedIn: 'root'
})
export class AdminGuard implements CanActivate {

  constructor(public userService:UserService,
             ){

  }
  canActivate(){
    
    if(this.userService.user.role === 'ADMIN_ROLE'){
        return true;
    }else{
      console.log('bloqueado por adminguardcomponent');
      this.userService.loadOut();
      return false;
    }

    return true;
  }
}
