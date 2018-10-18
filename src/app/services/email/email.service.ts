import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { URL_SERVICES } from '../../config/config';
import { UserService } from '../user/user.service';
import { User } from '../../app/models/user.model';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class EmailService {

  users:User[] = [];
  user:User;

  constructor(private http:HttpClient,
              private router:Router) { }

  sendMessage(body) {
    let url = URL_SERVICES + '/user/' + body.email;

      this.http.get(url).subscribe((res:any)=>{

        if(res.user.length <= 0 ){
          swal('user does not exist',body.email,'warning');
          return;
        }
         body.name = res.user.name;
      });

      let password = Math.random().toString(36).slice(2);
      body.affair = 'Password recovery';
      body.message = 'your new password is' + password;

      swal('Email Sent','ok','success');
      this.router.navigate(['/login']);

      let url2 = URL_SERVICES + '/email';
      return this.http.post(url2, body); 
    }
}
