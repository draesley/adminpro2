import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';

import swal from 'sweetalert';
import { UserService } from '../services/user/user.service';
import { User } from '../app/models/user.model';
import { Router } from '@angular/router';



//se inician plugin si no se queda cargando
declare function init_plugins();


@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./login.component.css']
})
export class RegisterComponent implements OnInit {

  formGroup:FormGroup;

  constructor(public userService:UserService,
              public router:Router) { }

  ngOnInit() {
    init_plugins();
    this.startVar();
  }

  startVar(){
    this.formGroup = new FormGroup({
      name: new  FormControl(null, Validators.required),
      email: new FormControl(null, [Validators.required, Validators.email]),
      password: new FormControl(Validators.required),
      password2: new FormControl(Validators.required),
      terms: new FormControl(false)
    },{validators: this.validatePassword('password','password2')});
  }

  validatePassword(pass:string, pass2:string){

    return (group:FormGroup) =>{

      let camp = group.controls[pass].value;
      let camp2 = group.controls[pass2].value;

      if(camp === camp2){
        return null;
      };

      return{
        validatePassword:true
      };
    }
  }

  registerUser(){

    if(this.formGroup.invalid ){
      return;
    };

    if(!this.formGroup.value.terms){
      swal("important", "the conditions must be accepted", "warning");
      return;
    };

    let user = new User(
      this.formGroup.value.name,
      this.formGroup.value.email,
      this.formGroup.value.password,
    );

    this.userService.createUser(user).subscribe(res =>{this.router.navigate(['/login']);})
  };
}