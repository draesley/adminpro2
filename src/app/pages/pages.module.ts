import { NgModule } from "@angular/core";
import { DashboardComponent } from "./dashboard/dashboard.component";
import { ProgressComponent } from "./progress/progress.component";
import { Grafic1Component } from "./grafic1/grafic1.component";
import { SharedModule } from "../shared/shared.module";
import { PAGES_ROUTES } from "./pages.routes";
import { FormsModule } from "@angular/forms";
import { IncrementComponent } from "../components/increment/increment.component";
import { ChartsModule } from 'ng2-charts';
import { GraficoDonaComponent } from "../components/gaficos/graficoDona.component";
import { AccoutSettingComponent } from './accout-setting/accout-setting.component';
import { PromisesComponent } from './promises/promises.component';
import { RxjsComponent } from "./rxjs/rxjs.component";
import { PipesModule } from "../pipes/pipes.module";
import { ProfileComponent } from './profile/profile.component';
import { CommonModule } from '@angular/common';
import { UsersComponent } from './users/users.component';
import { HospitalesComponent } from './hospitales/hospitales.component';
import { DoctorComponent } from "./doctor/doctor.component";
import { DoctorsComponent } from "./doctor/doctors.component";
import { SearchComponent } from './search/search.component';

@NgModule({
    declarations:[
        DashboardComponent,
        ProgressComponent,
        Grafic1Component,
        //PagesComponent, se quita y se coloca en app module
        IncrementComponent,
        GraficoDonaComponent,
        AccoutSettingComponent,
        PromisesComponent,
        RxjsComponent,
        ProfileComponent,
        UsersComponent,
        //ModalUploadComponent,
        HospitalesComponent,
        DoctorComponent,
        DoctorsComponent,
        SearchComponent,
    ],
    exports:[
        DashboardComponent,
        ProgressComponent,
        Grafic1Component,
        //PagesComponent,
    ],
    imports:[
        SharedModule,
        PAGES_ROUTES,
        FormsModule,
        ChartsModule,
        PipesModule,
        CommonModule
    ]
})
export class PagesModule{}