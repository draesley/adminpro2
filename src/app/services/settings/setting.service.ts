import { Injectable, Inject } from '@angular/core';
import { DOCUMENT } from '@angular/platform-browser';

@Injectable({
  providedIn: 'root'
})
export class SettingService {

  settings:Settings ={
    theme:'default-dark',
    themeUrl:'./assets/css/colors/default-dark.css'
  }
  
  constructor(@Inject(DOCUMENT) private _document,) {
    this.createSettings();
   }

  saveSettings(){
    localStorage.setItem('settings',JSON.stringify(this.settings));
  }

  createSettings(){
    if(localStorage.getItem('settings')){
      this.settings = JSON.parse(localStorage.getItem('settings'));
      this.appliTheme(this.settings.theme);
    }else{
      this.appliTheme(this.settings.theme);
    }
  }

  appliTheme(theme:String){
    let urlTheme = `./assets/css/colors/${theme}.css`;
    this._document.getElementById('themes').setAttribute('href', urlTheme);
    this.settings.theme = theme;
    this.settings.themeUrl = urlTheme;
    this.saveSettings();
  }
}

interface Settings{
  theme:String;
  themeUrl:String;
}
