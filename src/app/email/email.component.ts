import { Component, OnInit } from '@angular/core';
import { EmailService } from '../services/email/email.service';
import { Email } from '../app/models/email';

@Component({
  selector: 'app-email',
  templateUrl: './email.component.html',
  styleUrls: ['./email.component.css']
})
export class EmailComponent implements OnInit {


  email:string = '';
  password:string = '';
  emailObject:Email;

  constructor(private emailService:EmailService) { }

  ngOnInit() {
    this.init();
  }

  init(){
    this.emailObject = {
      name:'',
      email:'',
      password:'',
      affair:'',
      message:''
    }
  }

  submitPassword(){

    if(this.email == '' || this.email == null){
        swal('Email Required','please enter an email','warning');
        return;
    }

    if(this.password == '' || this.password == null){
      swal('Password Required','please enter an password','warning');
      return;
    }
   
    this.emailObject.email = this.email;

    this.emailService.sendMessage(this.emailObject).subscribe();
  }
}
