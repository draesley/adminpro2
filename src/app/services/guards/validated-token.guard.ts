import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { UserService } from '../user/user.service';
import { reject } from 'q';

@Injectable({
  providedIn: 'root'
})
export class ValidatedTokenGuard implements CanActivate {

  constructor(public serviceUser:UserService,
              public router:Router){

  }

  canActivate(): Observable<boolean> | Promise<boolean> | boolean {


    let token = this.serviceUser.token;
    //trae la info del token
    let payload = JSON.parse( atob(token.split('.')[1]));
    let expired = this.expiredToken(payload.exp);

    if(expired){
      this.router.navigate(['/login']);
      return false;
    }

    return this.validateAndRefresh(payload.exp);
  }

  validateAndRefresh(dateExp:number):Promise<boolean>{

    return new Promise((resolve, reject)=>{
      let tokenExp = new Date(dateExp * 1000);
      let now = new Date();

      now.setTime(now.getTime() + 4 * 60 * 60 * 1000 );

        if(tokenExp.getTime() > now.getTime()){
          resolve(true);
        }else{
          this.serviceUser.refreshToken()
          .subscribe(()=>{
            resolve(true);
          },()=>{
            this.router.navigate(['/login']);
            reject(false);
          });
        }

        resolve(true);
    });

  }

  expiredToken(dateExpired:number){
    
    let hour = new Date().getTime()/1000;

    if(dateExpired < hour){
      return true;
    }else{
      return false;
    }


  }
}
