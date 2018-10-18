import { Component, OnInit } from '@angular/core';
import { User } from '../../app/models/user.model';
import { UserService, ModalUploadService } from '../../services/services.index';

declare var swal:any;

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styles: []
})
export class UsersComponent implements OnInit {

  users:User[] = [];
  since: number = 0;
  totalRecords: number = 0;
  loading: boolean = true;

  constructor(public userService:UserService,
              public modalUpdateService:ModalUploadService) { }

  ngOnInit() {
    this.loadUsers();
    this.modalUpdateService.emitter.subscribe(res=>{
      this.loadUsers();
    });
  }

  loadUsers(){

      this.loading = true;
  
      this.userService.loadUsers(this.since).subscribe((res:any)=>{
      this.totalRecords = res.total;
      this.users = res.users;  
      this.loading = false;
    });
  }

  changeSince(index:number){
      let since = this.since + index;

      if(since >= this.totalRecords){
          return;
      }

      if(since < 0){
        return;
      }

      this.since += index;
      this.loadUsers();
  }

  searchUser(index:string){

    if(index.length <= 0){
        this.loadUsers();
        return;
    }
    
    this.loading = true;
    this.userService.searchUser(index).subscribe((users:User[])=>{
      this.users = users;
      this.loading = false;
    });
  }

  deleteUser(user:User){

    if(user._id === this.userService.user._id){
        swal("error!!!","you can not erase yourself","warning");
        return;
    }

    swal({
      title:'¿you are sure to delete this user?',
      text:user.name,
      icon:'warning',
      buttons:true,
      dangerMode:true,
    })
    .then(deleteUser =>{

      if(deleteUser){
        this.userService.deleteUser(user._id).subscribe((res:any)=>{
          swal('Delete ok','user delete','success');
          this.loadUsers();
        });;
      }
    });
  }

  updateUser(user:User){

    console.log(user);
    this.userService.updateUser(user).subscribe();
  }

  viewModal(user:User){
    this.modalUpdateService.viewModal('users', user._id);
  }
}
