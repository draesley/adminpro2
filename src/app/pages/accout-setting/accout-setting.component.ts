import { Component, OnInit, Inject } from '@angular/core';
import { DOCUMENT } from '@angular/platform-browser';
import { SettingService } from '../../services/services.index';

@Component({
  selector: 'app-accout-setting',
  templateUrl: './accout-setting.component.html',
  styles: []
})
export class AccoutSettingComponent implements OnInit {

  constructor(public settingService:SettingService) { 
    
  }

  ngOnInit() {
    this.pushCheck();
  }

  changeTheme(theme:String,link:any){
    this.applyCheck(link);
    this.settingService.appliTheme(theme);
  }

  applyCheck(link:any){
   
    let selectores:any = document.getElementsByClassName('selector');
    /* selectores.forEach(element => {
      element.classList.remove('working');
    }); */

    for(let ref of selectores){
      ref.classList.remove('working');
    }
    //este add no funciona error no esta definido
    //link.classList.add('working');
  }

  pushCheck(){

    let selectores:any = document.getElementsByClassName('selector');
    let tema = this.settingService.settings.theme;

    for(let ref of selectores){
      if(ref.getAttribute('data-theme') === tema){
         ref.classList.add('working');
         break;
      }
    }
  }
}