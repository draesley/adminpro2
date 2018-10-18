import { RouterModule, Routes } from "@angular/router";
import { DashboardComponent } from "./dashboard/dashboard.component";
import { ProgressComponent } from "./progress/progress.component";
import { Grafic1Component } from "./grafic1/grafic1.component";
import { AccoutSettingComponent } from "./accout-setting/accout-setting.component";
import { PromisesComponent } from "./promises/promises.component";
import { RxjsComponent } from "./rxjs/rxjs.component";
import { ProfileComponent } from "./profile/profile.component";
import { UsersComponent } from "../pages/users/users.component";
import { HospitalesComponent } from "./hospitales/hospitales.component";
import { DoctorComponent } from "./doctor/doctor.component";
import { DoctorsComponent } from "./doctor/doctors.component";
import { SearchComponent } from "./search/search.component";
import { AdminGuard, ValidatedTokenGuard } from "../services/services.index";

const pagesRoutes: Routes = [
            {
                path:'dashboard',
                component:DashboardComponent,
                canActivate:[
                    ValidatedTokenGuard
                ],
                data:{title:'Dashboard'}
            },
            {
                path:'progress',
                component:ProgressComponent,
                data:{title:'Progress'}
            },
            {
                path:'grafic1',
                component:Grafic1Component,
                data:{title:'Graphics'}
            },
            {
                path:'promises',
                component:PromisesComponent,
                data:{title:'Promises'}
            },
            {
                path:'',
                redirectTo:'/dashboard',
                pathMatch: 'full'
            },
            {
                path:'accout-setting',
                component:AccoutSettingComponent,
                data:{title:'Accout-Setting'}
            },
            {
                path:'profile',
                component:ProfileComponent,
                data:{title:'Profile'}
            },
            {
                path:'search/:termino',
                component:SearchComponent,
                data:{title:'Search'}
            },
            {
                path:'rxjs',
                component:RxjsComponent,
                data:{title:'Observable'}
            },
            //Mantenimiento
            {
                path:'users',
                component:UsersComponent,
                canActivate:[
                    AdminGuard
                ],
                data:{title:'Users'}
            },
            {
                path:'doctors',
                component:DoctorsComponent,
                data:{title:'Doctors'}
            },
            {
                path:'doctor/:id',
                component:DoctorComponent,
                data:{title:'Update Doctor'}
            },
            {
                path:'hospitales',
                component:HospitalesComponent,
                data:{title:'Hospitales'}
            }
];

export const PAGES_ROUTES = RouterModule.forChild(pagesRoutes);