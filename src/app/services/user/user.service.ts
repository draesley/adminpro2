import { Injectable } from '@angular/core';
import { User } from '../../app/models/user.model';
import { URL_SERVICES } from '../../config/config';
import { HttpClient } from '@angular/common/http';
//import { map } from 'rxjs';
import { map } from 'rxjs/operators';
import { Router } from '@angular/router';
import { UploadFileService } from '../uploadFile/uploadFile.service';
import  swal  from 'sweetalert';


@Injectable({
  providedIn: 'root'
})

export class UserService {

  user:User;
  token:string;
  menu:any[] = [];

  constructor(
      private http:HttpClient,
      private router:Router,
      private uploadFileService:UploadFileService
  ) { 
    this.loadStorage();
  }

  loadOut(){
    this.user = null;
    this.token = '';
    this.menu = [];
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    localStorage.removeItem('menu');
    this.router.navigate(['/login']);
    
  }

  refreshToken(){

    let url = URL_SERVICES + '/login/refreshToken'
    url += '?token=' + this.token;

    return this.http.get(url)
    .pipe(map( (res:any) =>{

        this.token = res.token;
        localStorage.setItem('token', this.token);
        return true;
    }));//se coloca el cath para redirecionar al login si el token no es valido seccion 18 video 230 minuto 4
  }

  userSignin(){
    return (this.token.length > 5 ) ? true : false;
  }

  loadStorage(){
    if(localStorage.getItem('token')){
        this.token = localStorage.getItem('token');
        this.user = JSON.parse(localStorage.getItem('user'));
        this.menu = JSON.parse(localStorage.getItem('menu'));
    }else{
      this.token = '';
      this.user = null;
      this.menu = [];
    }
  }

  saveStorage(id:string, token:string, user:User, menu:any){

    localStorage.setItem('id', id);
    localStorage.setItem('token', token);
    localStorage.setItem('user', JSON.stringify(user));
    localStorage.setItem('menu', JSON.stringify(menu));

    this.user = user;
    this.token = token;
    this.menu = menu;
  }

  loginGoogle(token:string){

    let url = URL_SERVICES + '/login/google';

    return this.http.post(url, {token}).pipe(map((res:any)=>{
      this.saveStorage(res.id, res.token, res.user, res.menu);
      return true;
    }));
  }

  login(user:User, remember:boolean = false){

    let url = URL_SERVICES + '/login';

    if(remember ){
      localStorage.setItem('email',user.email);
    }else{
      localStorage.removeItem('email');
    }

    return this.http.post(url, user).pipe(map((res:any)=>{

       this.saveStorage(res.id, res.token, res.user, res.menu);

      return true;
    }));
  }

  createUser(user:User){
    let url = URL_SERVICES +  '/user';

    return this.http.post(url, user)
    .pipe(map((res:any) =>{
      swal('User Created','ok Success','success');
      return res.user;
    }));
  }

  updateUser(user:User){

    let url = URL_SERVICES + '/user/' + user._id;
    url += '?token=' + this.token;

     return this.http.put(url,user).pipe(map((res:any) =>{

      if(user._id === this.user._id){
        let userdb = res.User;
        this.saveStorage(userdb._id,this.token, userdb, this.menu);
      }
       
        swal('User Update ',user.name,'success');
        return true;
      }));
  }

  changeImage(file:File, id:string){
      this.uploadFileService.uploadFile(file, 'users', id)
      .then((res:any)=>{
        this.user.img = res.user.img;
        this.saveStorage(id, this.token, this.user, this.menu);
      })
      .catch(res=>{
          swal('!errorrr',res,'Not image');
      });
  };

  loadUsers(since:number = 0){

      let url = URL_SERVICES + '/user?desde=' + since;
     return  this.http.get(url);
  }

  searchUser(index:string){
      let url = URL_SERVICES + '/search/collection/users/' + index;
      return this.http.get(url).pipe(map((res:any)=> res.users));

  }

  deleteUser(id:string){
    let url = URL_SERVICES + '/user/' + id;
    url += '?token=' + this.token;

    return this.http.delete(url);
  }
}
