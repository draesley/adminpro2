import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SettingService, SidebarService, SharedService, UploadFileService, LoginGuardGuard, AdminGuard } from './services.index';
import { UserService } from './user/user.service';
import { HttpClientModule } from '@angular/common/http';
import { ModalUploadService } from '../components/modal-upload/modal-upload.service';
import { HospitalService } from './hospital/hospital.service';
import { DoctorService } from './doctor/doctor.service';
import { ValidatedTokenGuard } from './guards/validated-token.guard';


@NgModule({
  imports: [
    CommonModule,
    HttpClientModule
  ],
  declarations: [],
  providers:[
    SettingService,
    SharedService,
    SidebarService,
    UserService,
    LoginGuardGuard,
    UploadFileService,
    ModalUploadService,
    HospitalService,
    DoctorService,
    AdminGuard,
    ValidatedTokenGuard
  ]
})
export class ServiceModule { }
