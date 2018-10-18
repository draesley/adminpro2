import { Component, OnInit } from '@angular/core';
import { UserService } from '../../services/services.index';
import { User } from '../../app/models/user.model';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styles: []
})
export class ProfileComponent implements OnInit {

  user:User;
  uploadFile:File;
  temporaryImage:string;

  constructor(public userService:UserService) {
    this.user = this.userService.user;
   }

  ngOnInit() {
    
  }

  save(user:User){
      this.user.name = user.name;

      if(this.user.google){
        this.user.email = user.email;
      };
      
       this.userService.updateUser(this.user).subscribe();
  }

  selectImage(file:File){

      if(!file){
        this.uploadFile = null;
        return;
      };

      if(file.type.indexOf('image') < 0){
          swal('!!!','only Image','warning');
          this.uploadFile = null;
          return;
      };

      this.uploadFile = file
    
      //js puro
      let fileReader = new FileReader();

      let imgtemp = fileReader.readAsDataURL(file);

      fileReader.onloadend = ()=>{
          this.temporaryImage = fileReader.result;
      };
  };

  changeImage(){
    this.userService.changeImage(this.uploadFile,this.user._id)
  }

}
