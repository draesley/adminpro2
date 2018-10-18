import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Form, NgForm } from '@angular/forms';
import { UserService } from '../services/user/user.service';
import { User } from '../app/models/user.model';
import { Subscriber } from 'rxjs';

//se inician plugin si no se queda cargando
declare function init_plugins();
declare const gapi:any;

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  auth2:any;
  remember:boolean = false;
  email:string;

  constructor(private router:Router,
              private userService:UserService) { }

  ngOnInit() {
      init_plugins();
      this.googleInit();

      this.email = localStorage.getItem('email') || '';
      if(this.email.length > 1){
        this.remember = true;
      }
  }

  googleInit(){
    gapi.load('auth2', ()=>{
      this.auth2 = gapi.auth2.init({
        clientId:'1087867947169-b8blf4fm7endngsvolmpec20bje4rctp.apps.googleusercontent.com',
        cookiepolicy:'single-host-origin',
        scope:'profile email'
      });
        this.attachSignin(document.getElementById('btnGoogle'));
    });
  }

  attachSignin(elementHtml){
    this.auth2.attachClickHandler(elementHtml, {}, (googleUser)=>{

      //let profile = googleUser.getBasicProfile();
      let token = googleUser.getAuthResponse().id_token;
      this.userService.loginGoogle(token).subscribe(()=>{

        //this.router.navigate(['/dashboard']);
        //se quita este enrutamiento pq da problemas al cargar el dashboard
        window.location.href = '#/dashboard';

      });
    });
  }

  logIn(form:NgForm){

    if(form.invalid){
      return;
    }

    let user = new User(null, form.value.email, form.value.password);

    this.userService.login(user, form.value.remember).subscribe(res => this.router.navigate(['/dashboard']));

      //this.router.navigate(['/dashboard']);
  }

}
