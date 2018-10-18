import { Component, OnInit } from '@angular/core';
import { UserService } from '../../services/services.index';
import { Router, ActivatedRoute } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { URL_SERVICES } from '../../config/config';
import { User } from '../../app/models/user.model';
import { Doctor } from '../../app/models/medico.model';
import { Hospital } from '../../app/models/hospital.model';


@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styles: []
})
export class SearchComponent implements OnInit {

  users:User[] = [];
  doctors:Doctor[] = [];
  hospitales:Hospital[] = [];

  constructor(public userService:UserService,
              public router:Router,
              public activatedRoute:ActivatedRoute,
              public http:HttpClient) { 

                activatedRoute.params.subscribe(params =>{
                  let termino = params['termino'];
                   this.search(termino);
                });
              }

  ngOnInit() {
  }

  search(termino:string){

    let url = URL_SERVICES + '/search/all/' + termino;

    this.http.get(url).subscribe((resp:any) =>{
      this.users = resp.users;
      this.doctors = resp.doctors;
      this.hospitales = resp.hospitales;
    })
    
  }

}
