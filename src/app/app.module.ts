import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';
import { NopagefoundComponent } from './shared/nopagefound/nopagefound.component';
import { APP_ROUTES } from './app.routes';
import { RegisterComponent } from './login/register.component';
import { PagesModule } from './pages/pages.module';
import { ServiceModule } from './services/service.module';
import { CommonModule } from '@angular/common';
import { SharedModule } from './shared/shared.module';
import { PagesComponent } from './pages/pages.component';
import { EmailComponent } from './email/email.component';
import { EmailService } from './services/email/email.service';



@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    NopagefoundComponent,
    RegisterComponent,
    PagesComponent,
    EmailComponent
  ],
  imports: [
    BrowserModule,
    //PagesModule,
    APP_ROUTES,
    FormsModule,
    CommonModule,
    ReactiveFormsModule,
    ServiceModule,
    SharedModule 
  ],
  providers: [
    EmailService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
